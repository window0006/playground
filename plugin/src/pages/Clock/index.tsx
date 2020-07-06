import React, { lazy, Suspense, useState, useEffect } from 'react';
import Loading from 'src/components/Loading';
import ErrorBoundary from 'src/components/ErrorBoundary';

const Component = lazy(
  () => import(/* webpackChunkName: 'Clock' */ './Clock')
);

export default () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading/>}>
        <Component />
      </Suspense>
    </ErrorBoundary>standard
  );
}
