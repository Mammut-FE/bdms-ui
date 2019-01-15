import React, { CSSProperties, MouseEvent } from 'react';
import { Checkbox } from '../checkbox';
import PropTypes from 'prop-types';
import { mapChildren, getNodeChildren } from './util';

import classNames from 'classnames/bind';
import styles from './treeNode.scss';

export interface TreeNodeProps {
  /**
   * 节点显示的名称
   */
  name: string;
  /**
   * 节点的key，在树上唯一
   */
  key: string;
  /**
   * 注释信息
   */
  description?: string;
  /**
   * 同key
   */
  nodeKey?: string;
  /**
   * 是否父节点
   * @default false
   */
  isParent?: boolean;
  /**
   * 节点元素的title信息，默认和name一样
   */
  title?: string;
  /**
   * 节点图标
   */
  icon?: string;
  /**
   * 是否显示更多按钮
   */
  showMore?: boolean;
  /**
   * 是否禁用节点
   * @default false
   */
  disabled?: boolean;
  /**
   * 节点是否可选
   * @default true
   */
  selectable?: boolean;
  /**
   * 自定义节点样式名
   */
  className?: string;
  /**
   * 自定义节点样式
   */
  style?: CSSProperties;
  /**
   * 节点层级
   */
  level?: number,
  /**
   * 是否展开
   */
  expanded?: boolean,
  /**
   * 是否选中
   */
  selected?: boolean;
  /**
   * 是否勾选
   */
  checked?: boolean;
  /**
   * 是否禁止勾选
   */
  disableCheckbox?: boolean;
  /**
   * 父节点是否选中局部子节点
   */
  halfChecked?: boolean;
  /**
   * 是否拖拽覆盖
   */
  dragOver?: boolean;
  /**
   * 节点展开事件
   */
  onNodeExpand?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点选中事件
   */
  onNodeSelect?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点勾选事件
   */
  onNodeCheck?: (value: string, checked: boolean, node: TreeNode) => void;
  /**
   * 节点dragstart事件
   */
  onNodeDragStart?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点dragenter事件
   */
  onNodeDragEnter?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点dragover事件
   */
  onNodeDragOver?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点dragleave事件
   */
  onNodeDragLeave?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点dragend事件
   */
  onNodeDragEnd?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点drop事件
   */
  onNodeDrop?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点右键事件
   */
  onNodeContextMenu?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 节点双击事件
   */
  onNodeDoubleClick?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
}

const cx = classNames.bind(styles);

export class TreeNode extends React.Component<TreeNodeProps, {}> {
  public static isTreeNode = true;

  public static contextTypes = {
    genTreeNode: PropTypes.func,
    showIcon: PropTypes.bool,
    checkable: PropTypes.bool,
    draggable: PropTypes.bool,
    selectable: PropTypes.bool
  };

  private nodeList: any[];
  private hasChildren: boolean;

  public render() {
    const { name, title, icon, description, style, className, children, isParent = false,
      disabled = false, expanded = false, selected = false, checked = false, halfChecked = false, disableCheckbox = false, dragOver = false } = this.props;
    const { showIcon, checkable, draggable } = this.context;

    const nodeList = this.nodeList = getNodeChildren(children);
    const hasChildren = this.hasChildren = nodeList.length !== 0 || isParent;

    const classes = cx('treenode', className);

    const switchIconDom = hasChildren ? <i className={cx('treenode-switch', 'icon-caret-down', {
      'closed': !expanded
    })} /> : null;

    const contentDom = (<div draggable={draggable}>
      {
        showIcon && icon ? <i className={cx('treenode-icon', 'icon-' + icon, {
          'parent': hasChildren
        })} /> : null
      }
      <span title={title || name} className={cx('treenode-name', {
        'indent': !!description
      })}>{name}</span>
      {description ? <span className={cx('treenode-desc')}>{description}</span> : null}
    </div>);

    const checkboxDom = checkable ? <Checkbox className={cx('treenode-checkbox')} value={name} checked={checked} disabled={disabled || disableCheckbox} isIndeterminate={halfChecked} onChange={this.handleCheck}>
      {contentDom}
    </Checkbox> : contentDom;

    return (
      <li className={classes} style={style}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        onDragEnd={this.handleDragEnd}
        onDoubleClick={this.handleDoubleClick}
        onContextMenu={this.handleContextMenu}>
        <div className={cx('treenode-title', {
          'disabled': disabled,
          'active': selected,
          'drag-over': dragOver
        })} onClick={this.handleClick} onDragStart={this.handleDragStart}>
          {switchIconDom}
          {checkboxDom}
        </div>
        {this.renderChildren()}
      </li>
    );
  }

  private renderChildren = () => {
    const { expanded = false, level = 0 } = this.props;
    const { genTreeNode } = this.context;

    return expanded && this.nodeList.length ? (
      <ul className={cx('treenode-child', `tree-level-${level}`)}>
        {mapChildren(this.nodeList, (node: any) => (
          genTreeNode(node, level + 1)
        ))}
      </ul>
    ) : null;
  };

  private handleClick = (e: MouseEvent<HTMLElement>) => {
    const { onNodeExpand, onNodeSelect } = this.props;
    this.hasChildren && onNodeExpand && onNodeExpand(e, this);
    this.context.selectable && onNodeSelect && onNodeSelect(e, this);
  }

  private handleCheck = (value: string, checked: boolean) => {
    const { onNodeCheck } = this.props;
    onNodeCheck && onNodeCheck(value, checked, this);
  }

  private handleDragStart = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDragStart } = this.props;
    e.stopPropagation();
    this.context.draggable && onNodeDragStart && onNodeDragStart(e, this);
  }

  private handleDragEnter = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDragEnter } = this.props;
    e.preventDefault();
    e.stopPropagation();
    this.context.draggable && onNodeDragEnter && onNodeDragEnter(e, this);
  }

  private handleDragOver = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDragOver } = this.props;
    e.preventDefault();
    e.stopPropagation();
    this.context.draggable && onNodeDragOver && onNodeDragOver(e, this);
  }

  private handleDragLeave = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDragLeave } = this.props;
    e.stopPropagation();
    this.context.draggable && onNodeDragLeave && onNodeDragLeave(e, this);
  }

  private handleDragEnd = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDragEnd } = this.props;
    e.stopPropagation();
    this.context.draggable && onNodeDragEnd && onNodeDragEnd(e, this);
  }

  private handleDrop = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDrop } = this.props;
    e.preventDefault();
    e.stopPropagation();
    this.context.draggable && onNodeDrop && onNodeDrop(e, this);
  }

  private handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    const { onNodeContextMenu } = this.props;
    e.preventDefault();
    onNodeContextMenu && onNodeContextMenu(e, this);
  }

  private handleDoubleClick = (e: MouseEvent<HTMLElement>) => {
    const { onNodeDoubleClick } = this.props;
    onNodeDoubleClick && onNodeDoubleClick(e, this);
  }
}
