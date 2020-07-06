import http from '../http';

// test('Request should be combinded.', () => {
//   http.get('a', { a: 0, b: '' })

//   http.get('b', { c: 0, d: '' })

//   setTimeout(() => {
//     expect(http.getResolvers().length).toBe(0);
//   }, 0);
// });

test('Mock return value.', async () => {
  const p1 = http.get('/record/r1', { a: 0, b: '' });
  const p2 = http.get('/record/r2', { c: 0, d: '' });
  const p3 = http.post('/save', { e: 1, f: 2 });
  
  const [v1, v2, v3] = await Promise.all([
    p1, p2, p3
  ]);

  console.log(v1, v2, v3);

  expect(v1.response).toHaveProperty('a');
  expect(v2.response).toHaveProperty('c');
  expect(v3.response).toHaveProperty('success');
});
