import React from 'react';

import Layout from 'src/components/Layout';
import './home.less';

const Home: React.FunctionComponent = (props) => {
  console.log(2)
  return (
    <Layout>
      {
        props.children
      }
    </Layout>
  );
}

export default Home;
