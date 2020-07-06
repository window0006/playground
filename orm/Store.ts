import Record from './Record';
import http from './http';

export interface ISchema {
  [fieldName: string]: any;
}

interface IModel {
  [modelName: string]: ISchema;
}

interface IRecords {
  [modelName: string]: {
    [id: number]: Record;
  };
}

export default class Store {
  models: IModel = {}

  records: IRecords = {}

  /**
   * 定义一个记录模型(新增表)
   *
   * @param {string} type
   * @param {ISchema} attrs
   * @memberof Store
   */
  defineModel(type: string, attrs: ISchema) {
    this.models[type] = attrs;
  }

  /**
   * 创建一个指定类型的 Record
   *
   * @template T
   * @param {string} type
   * @param {T} attrs
   * @returns
   * @memberof Store
   */
  createRecord<T extends { [key: string]: any }>(type: string, attrs: T) {
    const model = this.models[type];

    if (!model) {
      throw new Error(`Model "${type}" is not defined.`);
    }

    const recordData = Object.keys(model).reduce((data: any, key) => {
      data[key] = attrs[key] || null;
      return data;
    }, {});
 
    const record = new Record(type, recordData);
    
    return record as Record & T;
  }

  /**
   * 根据条件查询一组记录（不通过缓存查询，并将结果保存至缓存）
   *
   * @param {string} type
   * @param {ISchema} params
   * @returns {(Promise<Array<Record> | void>)}
   * @memberof Store
   */
  async query(type: string, params: ISchema): Promise<Array<Record>>{
    const { status, response } = await http.get(`/record-list/${type}`, params);
    
    if (status !== 200) {
      return [];
    }

    return response.map((attrs: ISchema) => {
      const record = this.createRecord(type, attrs);
      this.cacheRecord(record);
      return record;
    });
  }

  /**
   * 查询一条记录（不通过缓存查询，并将结果保存至缓存）
   *
   * @param {string} type
   * @param {number} id
   * @returns {(Promise<Record | void>)}
   * @memberof Store
   */
  async queryRecord(type: string, id: number): Promise<Record | null> {
    const { status, response } = await http.get(`/record/${type}/${id}`, this.models[type]);

    if (status !== 200) {
      return null;
    }

    const record = this.createRecord(type, response);
    this.cacheRecord(record);

    return record;
  }

  /**
   * 从缓存中查询一条记录
   *
   * @param {string} type
   * @param {number} id
   * @returns {(Promise<Record | void>)}
   * @memberof Store
   */
  async findRecord(type: string, id: number): Promise<Record | null> {
    const temp = this.records[type] || {};
    const cachedRecord = temp[id];


    if (cachedRecord) {
      cachedRecord.__fromcache = true;
      return cachedRecord;
    }
    
    return this.queryRecord(type, id);
  }

  /**
   * 清空所有已缓存的记录
   *
   * @memberof Store
   */
  unloadAll(): void {
    this.records = {};
  }

  /**
   * 将record缓存在内存中
   *
   * @param {Record} record
   * @memberof Store
   */
  cacheRecord(record: Record) {
    const { type, id } = record;
    let records = this.records[type];
    if (!records) {
      records = {};
      this.records[type] = records;
    }

    records[id] = record;
  }
}
