import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import './layout.less';

const { Header, Content, Footer } = Layout;

const Component: React.FunctionComponent = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="page-main-wrapper">
          {
            props.children
          }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>React App ©2018 Created by Window Yang</Footer>
    </Layout>
  );
}

export default Component;
