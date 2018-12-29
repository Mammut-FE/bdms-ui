import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import SelectOption, { SelectOptionProps } from './option';

const cx = classNames.bind(style);

export interface SelectDropdownProps {
  hoverIndex?: number;
  optionProps: SelectOptionProps[];
  onOptionClick?: (optionProps: SelectOptionProps) => void;
}

export default class SelectInput extends React.Component<SelectDropdownProps> {
  private hoverIndexBefore: number = -1;
  public static defaultProps: Partial<SelectDropdownProps> = {
    hoverIndex: -1
  };

  public componentWillReceiveProps(nextProps: Readonly<SelectDropdownProps>) {
    if (nextProps.hoverIndex !== this.props.hoverIndex) {
      this.hoverIndexBefore = this.props.hoverIndex!;
    }
  }

  public renderContent = () => {
    const { optionProps, hoverIndex, onOptionClick } = this.props;

    return optionProps.map((optionProp, index) => {
      return (
        <SelectOption
          {...optionProp}
          key={index}
          hover={hoverIndex === index}
          onClick={() => onOptionClick && onOptionClick(optionProp)}
        />
      );
    });
  };

  public setScrollTop = ref => {
    if (!ref) return;
    const { hoverIndex } = this.props;
    const currentItem = ref.children[hoverIndex!];
    const hoverIndexBefore = this.hoverIndexBefore;

    if (!currentItem || hoverIndex === hoverIndexBefore) return;
    if (
      currentItem.offsetTop + currentItem.clientHeight > ref.scrollTop + ref.clientHeight ||
      currentItem.offsetTop < ref.scrollTop
    ) {
      if (hoverIndex! > hoverIndexBefore) {
        ref.scrollTop = currentItem.offsetTop - ref.clientHeight + currentItem.clientHeight;
      } else {
        ref.scrollTop = currentItem.offsetTop;
      }
    }
  };

  public render(): React.ReactNode {
    return (
      <div ref={ref => this.setScrollTop(ref)} className={cx('dropdown')}>
        {this.renderContent()}
      </div>
    );
  }
}
