import { Samples } from "../Demo";
import * as React from "react";
import { Checkbox } from "../../../src";

const samples: Samples = [{
  title: '基本使用',
  description: 'hhh',
  component: class extends React.Component<any, {checked: boolean}> {
    public state = {
      checked: false
    }

    public onChange = (value, checked) => {
      this.setState({checked});
    }

    public render() {
      return (
        <div>
          <Checkbox value="haha" checked={this.state.checked} onChange={this.onChange}>哈哈</Checkbox>
          <div>Checked: {`${this.state.checked}`}</div>
        </div>
      )
    }
  }
}, {
  title: '多选组',
  description: 'hhh',
  component: class extends React.Component {
    public render() {
      return (
        <Checkbox.Group
        data={[
          {
            value: 'en',
            checked: false
          }, {
            value: 'check-2',
            checked: true
          }
        ]}
      />
      )
    }
  }
}, {
  title: '竖直多选组',
  description: '竖直多选组',
  component: () => (
    <Checkbox.Group
      mode="vertical"
      data={[
        {
          value: 'en',
          checked: false,
          text: '中文'
        }, {
          value: 'check-2',
          checked: true
        }, {
          value: 'check3',
          checked: true,
          text: '英文'
        }
      ]}
    />
  )
}]

export default samples
