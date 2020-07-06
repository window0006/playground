import Store from '../Store';

const store = new Store();

test('Record', () => {
  store.defineModel('ggg', {
    id: 0,
    a: 0,
    b: '',
  });
  const record = store.createRecord('ggg', {
    id: 1,
    a: 1,
    b: 'd'
  });
  record.b = 'c';

  expect(record.alternative.b).toEqual('d');
  expect(record.b).toEqual('c');

  record.rollback();
  expect(record.b).toEqual('d');

  expect(() => {
    record.id = 2;
  }).toThrow('Property "id" is immutable.');
});

test('Stroe: 调用createStore之前要定义对应type的model', () => {
  expect(() => {
    store.createRecord('ddd', {
      a: 1,
    });
  }).toThrow('Model "ddd" is not defined.');
});

test('Stroe: query查询', async () => {
  const records = await store.query('ggg', {
    id: 1,
  });

  expect(records.length).toBe(3);
});

test('Stroe: 发起多个查询', async () => {
  store.queryRecord('ggg', 1).then(record => {
    expect(record).toHaveProperty('a');
  });

  store.queryRecord('ggg', 2).then(record => {
    expect(record).toHaveProperty('a');
  });

  store.queryRecord('ggg', 3).then(record => {
    expect(record).toHaveProperty('a');
  });
});

test('Stroe: findRecord查询正常', async () => {
  store.defineModel('abc', {
    id: 0,
    a: 0,
    b: '',
  });
  const record = await store.findRecord('abc', 1);

  // console.log(record);
  expect(record?.id).toBe(1);
  expect(record?.__fromcache).toBe(undefined);

  const record2 = await store.findRecord('abc', 1);
  expect(record2?.__fromcache).toBe(true);
});
