import { Samples } from '../Demo';
import * as React from 'react';
import { Select } from '../../../src/components/select';
import DemoRow from '../DemoRow';
import { Icon } from '../../../src/components/icon';
import { Button } from '../../../src/components/button';

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
    subtitle: 'sloth',
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
      value: options[0].name,
      selected: null
    };

    public handleChange = (value, selected) => {
      console.log(value, selected);
      this.setState({
        value,
        selected
      });
    };

    public render() {
      return renderContent(this);
    }
  };
}

const samples: Samples = [
  {
    title: '单选下拉框',
    description: '单选下拉框示例',
    component: createSelectSampleClass(function(self) {
      const { options } = self.state;

      return (
        <div>
          <DemoRow>
            <h5>不可输入</h5>
            <br />
            <Select value={self.state.value} onChange={self.handleChange}>
              {options.map(option => (
                <Select.option key={option.id} title={option.name} param={option} />
              ))}
            </Select>
          </DemoRow>
          <DemoRow>
            <h5>可输入</h5>
            <br />
            <Select searchable defaultValue={options[0].name}>
              {options.map(option => (
                <Select.option key={option.id} title={option.name} param={option} />
              ))}
            </Select>
          </DemoRow>
          <DemoRow>
            <h5>特殊样式</h5>
            <br />
            <Select
              defaultValue={self.state.value}
              searchable
              icon={<Icon name={'database'} />}
              dropdownRender={options => (
                <div>
                  <div style={{ padding: '0 12px 6px', borderBottom: '1px solid #ccc' }}>
                    <Button icon="add">添加</Button>
                  </div>
                  {options}
                </div>
              )}
            >
              {options.map(option => (
                <Select.option
                  key={option.id}
                  disabled={option.id === 'operation'}
                  title={option.name}
                  subtitle={option.subtitle}
                  param={option}
                />
              ))}
            </Select>
          </DemoRow>
        </div>
      );
    })
  }
];

export default samples;
