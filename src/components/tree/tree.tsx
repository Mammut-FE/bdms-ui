import React, { CSSProperties, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { TreeNode } from './tree-node';
import toArray from 'rc-util/lib/Children/toArray';

import classNames from 'classnames/bind';
import styles from './tree.scss';
import { convertTreeToEntities, conductCheck, mapChildren, arrAdd, arrDel } from './util';

interface TreeProps {
  /**
   * 节点前是否显示复选框
   * @default false
   */
  checkable?: boolean;
  /**
   * 默认选中的节点（复选框模式下）
   * @default []
   */
  defaultCheckedKeys?: string[];
  /**
   * 节点是否可选中
   * @default true
   */
  selectable?: boolean;
  /**
   * 默认选中的节点
   * @default []
   */
  defaultSelectedKeys?: string[];
  /**
   * 默认展开的节点
   * @default []
   */
  defaultExpandedKeys?: string[];
  /**
   * 默认展开所有节点
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 节点是否可拖拽
   * @default false
   */
  draggable?: boolean;
  /**
   * 是否显示节点前的图标
   * @default false
   */
  showIcon?: boolean;
  /**
   * 没有节点时的空值内容
   * @default 暂无内容
   */
  emptyText?: string;
  /**
   * 子节点
   */
  children?: React.ReactNode;
  /**
   * 自定义树的样式名
   */
  className?: string;
  /**
   * 自定义树的样式
   */
  style?: CSSProperties;
  /**
   * 双击事件
   */
  onDoubleClick?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 右键事件
   */
  onRightClick?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 展开事件
   */
  onExpand?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 选中事件
   */
  onSelect?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * 勾选事件
   */
  onCheck?: (value: string, checked: boolean, node: TreeNode) => void;
  /**
   * dragstart事件
   */
  onDragStart?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * dragenter事件
   */
  onDragEnter?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * dragover事件
   */
  onDragOver?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * dragleave事件
   */
  onDragLeave?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * dragend事件
   */
  onDragEnd?: (e: MouseEvent<HTMLElement>, node: TreeNode) => void;
  /**
   * drop事件
   */
  onDrop?: (e: MouseEvent<HTMLElement>, targetNode: TreeNode, dragNode: TreeNode) => void;
}

interface TreeState {
  treeNode: any;
  expandedKeys: string[];
  selectedKeys: string[];
  checkedKeys: string[];
  halfCheckedKeys: string[];
  dragOverNodeKey: string;
  treeEntities: object;
}

const cx = classNames.bind(styles);

export class Tree extends React.Component<TreeProps, TreeState> {
  public static TreeNode = TreeNode;

  public static defaultProps: Partial<TreeProps> = {
    checkable: false,
    defaultCheckedKeys: [],
    selectable: true,
    defaultSelectedKeys: [],
    defaultExpandedKeys: [],
    defaultExpandAll: false,
    disabled: false,
    draggable: false,
    showIcon: true,
    emptyText: '暂无内容'
  };

  public static childContextTypes = {
    genTreeNode: PropTypes.func,
    showIcon: PropTypes.bool,
    checkable: PropTypes.bool,
    draggable: PropTypes.bool,
    selectable: PropTypes.bool
  };

  public state: Readonly<TreeState> = {
    treeNode: null,
    expandedKeys: [],
    selectedKeys: [],
    checkedKeys: [],
    halfCheckedKeys: [],
    dragOverNodeKey: '',
    treeEntities: {}
  };

  private dragNode: TreeNode | null;

  constructor(props: TreeProps) {
    super(props);
    this.initProps();
  }

  public getChildContext() {
    const { showIcon = true, checkable = false, selectable = true, draggable = false } = this.props;
    return {
      genTreeNode: this.genTreeNode,
      showIcon, checkable, draggable, selectable
    };
  }

  public render() {
    const { disabled, style, className } = this.props;
    const { treeNode } = this.state;

    const classes = cx('tree', `${className} tree-level-0`, {
      'disabled': disabled
    });

    return (
      <ul className={classes} style={style}>
        {mapChildren(treeNode, (node: any) => (
          this.genTreeNode(node, 1)
        ))}
      </ul>
    );
  }

  private initProps = () => {
    const { children, checkable = false, defaultCheckedKeys = [], defaultExpandAll = [], defaultExpandedKeys = [],
      defaultSelectedKeys = [], selectable = true } = this.props;

    const newState = {} as TreeState;

    const treeNode = children && toArray(children) || null;
    if (treeNode) {
      newState.treeNode = treeNode;
      newState.treeEntities = convertTreeToEntities(treeNode);
    }

    const treeEntities = newState.treeEntities;

    newState.expandedKeys = defaultExpandAll ? Object.keys(treeEntities) : (defaultExpandedKeys || []);

    newState.selectedKeys = selectable && defaultSelectedKeys && defaultSelectedKeys.length ? [defaultSelectedKeys[0]] : [];

    if (checkable) {
      const conductKeys = conductCheck(defaultCheckedKeys || [], true, treeEntities);
      newState.checkedKeys = conductKeys.checkedKeys || [];
      newState.halfCheckedKeys = conductKeys.halfCheckedKeys || [];
    }

    this.state = newState;
  }

  private onNodeExpand = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    let { expandedKeys } = this.state;
    const { expanded, nodeKey = '' } = node.props;
    const targetExpanded = !expanded;
    expandedKeys = targetExpanded ? arrAdd(expandedKeys, nodeKey) : arrDel(expandedKeys, nodeKey);
    this.setState({ expandedKeys });

    const { onExpand } = this.props;
    onExpand && onExpand(e, node);
  }

  private onNodeSelect = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    const { nodeKey = '' } = node.props;
    this.setState({ selectedKeys: [nodeKey] });

    const { onSelect } = this.props;
    onSelect && onSelect(e, node);
  }

  private onNodeCheck = (value: string, checked: boolean, node: TreeNode) => {
    const { nodeKey = '' } = node.props;
    const { checkedKeys = [], halfCheckedKeys = [] } = conductCheck([nodeKey], checked, this.state.treeEntities, {
      checkedKeys: this.state.checkedKeys,
      halfCheckedKeys: this.state.halfCheckedKeys
    });
    this.setState({ checkedKeys, halfCheckedKeys });

    const { onCheck } = this.props;
    onCheck && onCheck(value, checked, node);
  }

  private onNodeDragStart = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    const { expandedKeys } = this.state;
    const { nodeKey = '' } = node.props;

    this.dragNode = node;

    this.setState({
      expandedKeys: arrDel(expandedKeys, nodeKey)
    });

    const { onDragStart } = this.props;
    onDragStart && onDragStart(e, node);
  };

  private onNodeDragEnter = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    const { expandedKeys } = this.state;
    const { nodeKey = '' } = node.props;

    if (!this.dragNode) {
      return;
    }

    if (this.dragNode.props.nodeKey === nodeKey) {
      this.setState({
        dragOverNodeKey: ''
      });
      return;
    }

    setTimeout(() => {
      this.setState({
        dragOverNodeKey: nodeKey
      });

      const newExpandedKeys = arrAdd(expandedKeys, nodeKey);
      this.setState({
        expandedKeys: newExpandedKeys
      });

      const { onDragEnter } = this.props;
      onDragEnter && onDragEnter(e, node);
    }, 0);
  };

  private onNodeDragOver = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    const { onDragOver } = this.props;
    onDragOver && onDragOver(e, node);
  }

  private onNodeDragLeave = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    this.setState({
      dragOverNodeKey: '',
    });

    const { onDragLeave } = this.props;
    onDragLeave && onDragLeave(e, node);
  };

  private onNodeDragEnd = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    this.setState({
      dragOverNodeKey: '',
    });

    const { onDragEnd } = this.props;
    onDragEnd && onDragEnd(e, node);

    this.dragNode = null;
  };

  private onNodeDrop = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    this.setState({
      dragOverNodeKey: '',
    });

    if (!this.dragNode) {
      return;
    }

    const { onDrop } = this.props;
    onDrop && onDrop(e, node, this.dragNode);

    this.dragNode = null;
  };

  private onNodeContextMenu = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    const { onRightClick } = this.props;
    onRightClick && onRightClick(e, node);
  }

  private onNodeDoubleClick = (e: MouseEvent<HTMLElement>, node: TreeNode) => {
    const { onDoubleClick } = this.props;
    onDoubleClick && onDoubleClick(e, node);
  }

  private genTreeNode = (node: any, level: number) => {
    const { expandedKeys = [], selectedKeys = [], checkedKeys = [], halfCheckedKeys = [], dragOverNodeKey = '' } = this.state;
    const key = node.key;
    const props = {
      ...node.props,
      nodeKey: node.key,
      level,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
      checked: checkedKeys.indexOf(key) !== -1,
      halfChecked: halfCheckedKeys.indexOf(key) !== -1,
      onNodeExpand: this.onNodeExpand,
      onNodeSelect: this.onNodeSelect,
      onNodeCheck: this.onNodeCheck,
      onNodeDoubleClick: this.onNodeDoubleClick,
      onNodeContextMenu: this.onNodeContextMenu,
      onNodeDragStart: this.onNodeDragStart,
      onNodeDragEnter: this.onNodeDragEnter,
      onNodeDragOver: this.onNodeDragOver,
      onNodeDragLeave: this.onNodeDragLeave,
      onNodeDragEnd: this.onNodeDragEnd,
      onNodeDrop: this.onNodeDrop,
      dragOver: dragOverNodeKey === key
    };
    return (
      <TreeNode key={key} {...props} />
    );
  }
}
