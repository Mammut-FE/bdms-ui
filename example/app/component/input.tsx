import { Samples } from "../Demo";
import * as React from "react";
import { Input } from "../../../src";

const samples: Samples = [{
  title: '输入框',
  description: '输入框，如果不输入 value，那么是自主模式，如果输入 value，那么就是受控模式',
  component: class extends React.Component {
    public state = {
      text: '受控模式'
    }

    public onChange = (text) => {
      this.setState({text})
    }

    public render() {
      return (
        <div>
          <Input/>
          <Input placeholder="Input Here"/>
          <Input value="固定值"/>
          <Input value={this.state.text} onChange={this.onChange}/>
        </div>
      )
    }
  }
}]

export default samples
