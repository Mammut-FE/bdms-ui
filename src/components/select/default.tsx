import * as React from 'react';
import { Input } from '../input';

export default class Default extends React.Component {
  render(): React.ReactNode {
    const { ...props } = this.props;
    return <Input readOnly {...props} />;
  }
}
