import React, { Component } from 'react';

import Layout, { Header, Footer, Content, Sider } from '../src/components/layout/index';

class Container extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: '#09f', color: '#fff', height: '80px' }}>头部</Header>
        <Content>
          <Layout hasSider={true}>
            <Sider draggable={false}>侧边</Sider>
            <Content>内容</Content>
          </Layout>
        </Content>
        <Footer>底部</Footer>
      </Layout>
    );
  }
}

export default Container;
