import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import routes from 'src/routes';
import useNav from 'src/hooks/useNav';

import './layout.less';

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

const Component: React.FunctionComponent = (props) => {
  const { pathname } = useNav();
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        
      </Header>
      <Layout>
        <Sider
          breakpoint="xl"
          width={200}
          collapsible={true} // 显示下方按钮
          collapsed={isCollapsed} // 传入与此项时为受控组件
          defaultCollapsed={!isCollapsed} // 受控时失效
          onCollapse={() => setIsCollapsed(!isCollapsed)} // 
        >
          <Menu
            theme="dark"
            mode="inline"
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
        </Sider>
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
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        React App ©2020 Created by Window Yang
      </Footer>
    </Layout>
  );
}

export default Component;
