import { ISchema } from './Store';
import makeMockData from './__mocks__/mock';

interface IPostBody {
  [prop: string]: any;
}

type IGetBody = null;

export interface IReq {
  url: string;
  method: 'get' | 'post';
  body: IGetBody | IPostBody;
  model?: ISchema;
}

enum STATUS {
  'OK' = 200,
  'CLIENT_ERROR' = 404,
}

export interface IRes {
  status: STATUS;
  response: ISchema | ISchema[];
}

type IResolver = (value?: IRes | PromiseLike<IRes> | undefined) => void;

let combindReqData: IReq[] = [];
let resolvers: IResolver[] = [];

let requestTimer: NodeJS.Timeout | null;

export default {
  get(url: string, model?: ISchema): Promise<IRes> {
    return this.request({
      method: 'get',
      url,
      body: null,
      model,
    });
  },
  post(url: string, body: IPostBody, model?: ISchema): Promise<IRes> {
    return this.request({
      method: 'post',
      url,
      body,
      model,
    });
  },
  request(req: IReq): Promise<IRes> {
    return new Promise((resolve, reject) => {
      if (requestTimer) {
        clearTimeout(requestTimer);
        requestTimer = null;
      }

      combindReqData.push(req);
      resolvers.push(resolve);

      requestTimer = setTimeout(() => {
        // 发送合并后的请求
        ((combindReqData, resolvers) => {
          this.combindRequest(combindReqData, resolvers);
        })(combindReqData, resolvers); // 使用闭包将resolver存下来，防止请求过程中被修改

        // 清除临时数据
        combindReqData = [];
        resolvers = [];
      }, 0);
    });
  },
  combindRequest(combindReqData: IReq[], resolvers: IResolver[]) {
    setTimeout(() => {
      const mockDataArray: IRes[] = combindReqData.map(req => ({
        status: 200,
        response: makeMockData(req),
      }));

      resolvers.forEach((resolve, i) => resolve(mockDataArray[i]));

    }, 1000 * Math.random()); // mock network time
  },
};
