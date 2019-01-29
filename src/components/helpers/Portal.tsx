import { Component } from 'react';
import { createPortal } from 'react-dom';

export interface PartialProps {
  type?: 'absolute' | 'fixed';
}

export default class Portal extends Component<PartialProps> {
  private container: HTMLDivElement | null = null;

  public getContainer() {
    const { type = 'absolute' } = this.props;
    const container: HTMLDivElement = (this.container = this.container || document.createElement('div'));

    container.style.position = type;
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';

    document.body.appendChild(container);
    return container;
  }

  public componentWillUnmount(): void {
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  public render() {
    return createPortal(this.props.children, this.getContainer());
  }
}
