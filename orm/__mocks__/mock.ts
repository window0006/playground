import { IReq } from '../http';
import { ISchema } from '../Store';

/**
 * Generate record mock data by「model」, return random number or repeat 'abc' for random of times.
 *
 * @param {ISchema} model
 * @returns
 */
function mockByModel(model: ISchema, id?: number) {
  const data = Object.keys(model).reduce((data: ISchema, key) => {
    if (typeof model[key] === 'number') {
      data[key] = Math.floor(Math.random() * 100);
    } else {
      data[key] = 'abc'.repeat(Math.floor(Math.random() * 10));
    }
    return data;
  }, {});

  if (id) {
    data.id = id;
  }

  return data;
}

/**
 * Return http mock data response by matching url.
 *
 * @export
 * @param {IReq} req
 */
export default function (req: IReq) {
  const { url, model } = req;

  if (url.startsWith('/save')) {
    return {
      success: true,
    };
  }

  if (url.startsWith('/del')) {
    return {
      success: true,
    };
  }
  
  if (url.startsWith('/record-list')) {
    return [
      mockByModel(model as ISchema),
      mockByModel(model as ISchema),
      mockByModel(model as ISchema)
    ];
  }

  if (url.startsWith('/record')) {
    const id = Number(url.split('/').pop());
    return mockByModel(model as ISchema, id);
  }

  return {
    success: true,
  };
}