import http from './http';
import { ISchema } from './Store';

export default class Record {
  [key: string]: any;

  public id: number = 0; // todo id不允许修改

  public type: string = '';
  public model: ISchema = {};
  public alternative: ISchema = {};

  /**
   * Creates an instance of Record.
   * @param {string} type
   * @param {ISchema} attrs
   * @memberof Record
   */
  constructor(type: string, attrs: ISchema) {
    this.type = type;
    this.model = attrs;
    
    this.alternative = {
      ...attrs
    };
    
    this.data = attrs;

    this.proxyData();
  }

  /**
   * 在服务器端删除当前的记录
   *
   * @returns
   * @memberof Record
   */
  async destroyRecord(): Promise<boolean> {
    const { status } = await http.post(`/del/${this.type}/${this.id}`, {});
    return status === 200;
  }

  /**
   * 放弃所有未保存的记录更改
   *
   * @memberof Record
   */
  rollback() {
    Object.keys(this.model).forEach(key => {
      if (key === 'id') {
        return;
      }
      this[key] = this.alternative[key];
    });
  }

  /**
   * 在服务器端保存最新的更改
   *
   * @returns {Promise<boolean>}
   * @memberof Record
   */
  async save(): Promise<boolean> {
    const data = this.getData();

    const { status } = await http.post(`/save/${this.type}`, data);

    if (status !== 200) {
      return false;
    }

    this.alternative = data;
    return true;
  }

  /**
   * 根据model获取相关的字段值
   *
   * @returns {ISchema}
   * @memberof Record
   */
  getData(): ISchema {
    const data = Object.keys(this.model).reduce((data: any, key) => {
      data[key] = this[key] || null;
    }, {});
    
    return data;
  }

  /**
   * 将attrs入参的属性通过getter、setter添加到实例对象中
   *
   * @memberof Record
   */
  proxyData() {
    Object.keys(this.model).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.data[key];
        },
        set(value) {
          if (key === 'id') {
            throw new Error('Property "id" is immutable.');
          }
          this.data[key] = value;
        }
      });
    });
  }
}
