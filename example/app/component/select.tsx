import * as React from "react";
import { Select } from "../../../src";
import { Samples } from "../Demo";

const source = [
  {
    title: '数据开发',
    options: [
      {
        name: '新建任务',
        key: 'newTask',
        filter: 9
      }, {
        name: '开放依赖授权',
        key: 'exposeDependency',
        filter: 46
      }, {
        name: '收回依赖授权',
        key: 'withdrawDependency',
        filter: 47
      }
    ]
  }, {
    name: '新增队列',
    key: 'addQueue',
    filter: 32
  }, {
    name: '移交Owner',
    key: 'charge',
    filter: 33
  }, {
    name: '新增Hive库',
    key: 'addHive',
    filter: 34
  }
];

const samples: Samples = [{
  title: '多选选择器',
  description: '多选',
  component: () => (
    <Select source={source} title="全部动作">恩</Select>
  )
}]

export default samples
