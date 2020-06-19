import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import routes from 'src/routes';
import useNav from 'src/hooks/useNav';

import './layout.less';

const { Header, Content, Footer } = Layout;

const Component: React.FunctionComponent = (props) => {
  const { pathname } = useNav();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          selectedKeys={[pathname]}
        >
          {
            // 二级route作为导航大类
            routes[0].routes.filter(({ path }) => {
              return path !== '/404'
            }).map(({ path, name }) => {
              return (
                <Menu.Item key={`${path}`}>
                  {name}
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Header>
      <Content>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="page-main-wrapper">
          {
            props.children
          }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        React App ©2020 Created by Window Yang
      </Footer>
    </Layout>
  );
}

export default Component;
