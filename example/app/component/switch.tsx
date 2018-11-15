import { Samples } from "../demo";
import { Switch } from "../../../src";
import * as React from "react";
import DemoRow from "../DemoRow";

const samples: Samples = [{
  title: '开关展示',
  description: '有开启和关闭两个状态，启用和禁用。',
  component: class extends React.Component<any, {switch1: boolean, switch2: boolean}> {
    public state = {
      switch1: false,
      switch2: true,
    }

    public onChange1 = (state: boolean) => {
      this.setState({switch1: state})
    }

    public onChange2 = (state: boolean) => {
      this.setState({switch2: state})
    }

    public render() {
      return (
        <div>
          <DemoRow>
            <Switch open={this.state.switch1} onChange={this.onChange1}/>
            <Switch open={this.state.switch2} onChange={this.onChange2}/>
          </DemoRow>
          <DemoRow>
            <Switch disabled={true}/>
            <Switch disabled={true} open={true}/>
          </DemoRow>
        </div>
      )
    }
  }
}]

export default samples