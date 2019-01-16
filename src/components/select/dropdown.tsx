import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import { SelectOptionProps } from './option';
import { isSelectOptionIncluded } from './util';

const cx = classNames.bind(style);
/**
 * 空态组件
 * @constructor
 */
const SelectDropdownEmpty = () => {
  return <div className={cx('option', 'option--disabled')}>无信息</div>;
};

export interface SelectDropdownProps extends React.AllHTMLAttributes<HTMLDivElement> {
  hoverIndex?: number;
  keyword?: string;
  children?: React.ReactNode;
  contentRender?: (options: React.ReactNode) => React.ReactNode;
  onOptionClick?: (optionProps: SelectOptionProps) => void;
}

export default class SelectDropdown extends React.Component<SelectDropdownProps> {
  private hoverIndexBefore: number = -1;
  public static defaultProps: Partial<SelectDropdownProps> = {
    hoverIndex: -1,
    keyword: '',
    contentRender: options => options
  };

  public componentDidUpdate(prevProps: Readonly<SelectDropdownProps>) {
    // 记录上次的hoverIndex值
    if (prevProps.hoverIndex !== this.props.hoverIndex) {
      this.hoverIndexBefore = prevProps.hoverIndex!;
    }
  }

  /**
   * 渲染下拉框中的项目
   */
  public renderOptions = () => {
    const { children, hoverIndex, onOptionClick, keyword } = this.props;
    const content: React.ReactNode[] = [];
    let optionCount = 0;

    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as SelectOptionProps;
        const title = childProps.title;

        if (title) {
          if (childProps.ignore || isSelectOptionIncluded(childProps, keyword || '')) {
            content.push(
              <child.type
                key={index}
                hover={hoverIndex === optionCount}
                onClick={() => onOptionClick && onOptionClick(childProps)}
                {...childProps}
              />
            );
          }
          optionCount++;
        } else {
          content.push(child);
        }
      } else {
        content.push(child);
      }
    });

    return content;
  };
  /**
   * 动态设置scrollTop
   * @param ref
   */
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
