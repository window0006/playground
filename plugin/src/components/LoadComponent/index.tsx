import React from 'react';
import loadable from '@loadable/component';
import Loading from 'src/components/Loading';

export default (path: string) => loadable(() => import(path), {
  fallback: <Loading />
});
