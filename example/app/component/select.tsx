import { Samples } from '../Demo';
// import {Select} from '../../../src';
import * as React from 'react';
import { Select } from '../../../src/components/select';

const options = [
  {
    name: '数据开发',
    id: 'develop'
  },
  {
    name: '任务运维',
    id: 'operation'
  },
  {
    name: '自助分析',
    id: 'query'
  },
  {
    name: '数据管理',
    id: 'management'
  },
  {
    name: '实时流计算',
    id: 'sloth'
  },
  {
    name: '项目中心',
    id: 'procenter'
  },
  {
    name: '用户中心',
    id: 'user'
  }
];

function createSelectSampleClass(renderContent) {
  return class extends React.Component {
    public state = {
      options,
      value: options[0].name
    };

    public handleChange = value => {
      this.setState({ value });
    };

    public render() {
      return renderContent(this);
    }
  };
}

const samples: Samples = [
  {
    title: '单选不可输入下拉框',
    description: '单选不可输入下拉框示例',
    component: createSelectSampleClass(function(self) {
      const { options, value } = self.state;

      return (
        <div>
          <Select options={options} selected={value} onChange={self.handleChange}>
            {options.map(option => (
              <Select.option key={option.id} title={option.name} />
            ))}
          </Select>
        </div>
      );
    })
  }
];

export default samples;
