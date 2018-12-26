/*
 * @Author: jessica(gujing_hy@163.com)
 * @Date: 2018-06-06 13:42:37
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-19 16:18:40
 * @Last Modified time: 2018-09-04 11:32:44
 */
// import { Cartesian, Detail, Example, Library } from "@compositor/kit";
import classNames from 'classnames/bind';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import { Layout, Menu } from '../../src';
import styles from './App.scss';
import demos from './component';
import router from './router';

const cx = classNames.bind(styles);
const { Sider, Content } = Layout;
const { Item: MenuItem } = Menu;

export default class App extends Component<any> {
  public render() {
    return (
      <ErrorBoundary>
        <Layout hasSider={true}>
          <Sider className={cx('app-sidebar')}>
            <Menu mode="inline" multiple={false}>
              <MenuItem key="/playground" value="/playground">
                <Link to="/playground">Playground</Link>
              </MenuItem>
              {demos.map(demo => (
                <MenuItem key={demo.name} value={demo.name}>
                  <Link to={'/' + demo.name}>{demo.title}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Sider>
          <Content classNames={cx('app-content')}>
            <Switch>
              {router.map(route => (
                <Route key={route.path} {...route} />
              ))}
              <Redirect to={router[0].path} />
            </Switch>
          </Content>
        </Layout>
      </ErrorBoundary>
    );
  }
}
