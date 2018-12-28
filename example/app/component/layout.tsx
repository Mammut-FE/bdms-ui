import { Samples } from '../Demo';
import * as React from 'react';
import { Layout, Header, Content, Sider, Footer } from '../../../src';

const samples: Samples = [
  {
    title: '基础布局',
    description: 'xxx',
    component: () => (
      <Layout>
        <Header
          style={{
            backgroundColor: '#09f',
            color: '#fff',
            height: '80px'
          }}
        >
          头部
        </Header>
        <Content>
          <Layout hasSider={true}>
            <Sider draggable={false}>侧边</Sider>
            <Content>内容</Content>
          </Layout>
        </Content>
        <Footer>底部</Footer>
      </Layout>
    )
  }
];

export default samples;
