import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import SelectOption, { SelectOptionProps } from './option';

const cx = classNames.bind(style);

const SelectDropdownEmpty = () => {
  return <div className={cx('option', 'option--disabled')}>无信息</div>;
};

export interface SelectDropdownProps extends React.AllHTMLAttributes<HTMLDivElement> {
  hoverIndex?: number;
  keyword?: string;
  children?: React.ReactNode[];
  contentRender?: (options: React.ReactNode[] | React.ReactNode) => React.ReactNode;
  onOptionClick?: (optionProps: SelectOptionProps) => void;
}

export default class SelectDropdown extends React.Component<SelectDropdownProps> {
  private hoverIndexBefore: number = -1;
  public static defaultProps: Partial<SelectDropdownProps> = {
    hoverIndex: -1,
    keyword: '',
    contentRender: options => options
  };

  public componentWillReceiveProps(nextProps: Readonly<SelectDropdownProps>) {
    if (nextProps.hoverIndex !== this.props.hoverIndex) {
      this.hoverIndexBefore = this.props.hoverIndex!;
    }
  }

  public renderOptions = () => {
    const { children, hoverIndex, onOptionClick, keyword } = this.props;
    const options: React.ReactNode[] = [];

    if (!children) return [];
    children.forEach((child: React.ReactElement<SelectOptionProps>, index) => {
      const childProps = child.props;
      const title = childProps.title;

      if (title && SelectOption.isIncluded(childProps, keyword!)) {
        options.push(
          <child.type
            {...childProps}
            key={child.key || index}
            hover={hoverIndex === index}
            onClick={() => onOptionClick && onOptionClick(childProps)}
          />
        );
      }
    });

    return options;
  };

  public setScrollTop = ref => {
    if (!ref) return;
    const { hoverIndex } = this.props;
    const currentItem = ref.querySelectorAll(`.${cx('option')}`)[hoverIndex!];
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
    const { hoverIndex, keyword, contentRender, onOptionClick, ...props } = this.props;
    const optionsRendered = this.renderOptions();
    const options = optionsRendered.length ? optionsRendered : <SelectDropdownEmpty />;

    return (
      <div ref={ref => this.setScrollTop(ref)} className={cx('dropdown')} {...props}>
        {contentRender!(options)}
      </div>
    );
  }
}
