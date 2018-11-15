import React from "react";
import PlaygroundDefault from './Playground.default'

const placeholder = '.tsx'

export default class PlaygroundChecker extends React.Component<any, {
  Playground: React.ComponentType | null
}> {
  public state = {
    Playground: null
  }

  public componentWillMount() {
    import(
      /* webpackInclude: /Playground\.tsx$/ */
      `./Playground${placeholder}`
    ).then(Playground => {
      this.setState({
        Playground: Playground.default
      })
    }).catch(e => {
      console.error('请复制 Playground.default.tsx 到 Playground.tsx，然后就可以开始你的表演')
    })
  }

  public render() {
    const Playground = this.state.Playground || PlaygroundDefault
    return (<Playground/>)
  }
}
