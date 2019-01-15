import React from 'react';
import { Tree, TreeProps } from './tree';
import { TreeNode, TreeNodeProps } from './tree-node';

export interface ExplorerTreeProps extends TreeProps {
  /**
   * 树的原始数据
   */
  sourceData: ExplorerTreeNodeProps[];
  /**
   * 是否支持搜索
   * @default false
   */
  searchable?: boolean;
  /**
   * 树节点组件
   * @default TreeNode
   */
  nodeComponent?: typeof React.Component;
}

export interface ExplorerTreeNodeProps extends TreeNodeProps {
  /**
   * 子节点数据
   */
  children?: ExplorerTreeNodeProps[];
}

interface ExplorerTreeState {
  prevProps: ExplorerTreeProps | null;
  treeData: ExplorerTreeNodeProps[];
}

export class ExplorerTree extends React.Component<ExplorerTreeProps> {

  public static getDerivedStateFromProps(nextProps: ExplorerTreeProps, prevState: ExplorerTreeState) {
    const { prevProps } = prevState;
    return !prevProps || nextProps.sourceData !== prevProps.sourceData ? {
      treeData: (nextProps.sourceData || []).slice(),
      prevProps: nextProps
    } : prevState;
  }

  public state: ExplorerTreeState = {
    treeData: [],
    prevProps: null
  }

  private nodeComponent: typeof React.Component;

  constructor(props: ExplorerTreeProps) {
    super(props);
    const { sourceData = [] } = props;
    this.state = {
      treeData: sourceData.slice(),
      prevProps: props
    };
  }

  /**
   * 新增节点
   * @param node 新增的节点信息
   * @param pNodeKey 父节点的key，null表示根节点
   */
  public addNode(node: ExplorerTreeNodeProps, pNodeKey?: string) {
    if (!node) {
      return;
    }
    const treeData = this.state.treeData.slice();
    if (!pNodeKey) {
      treeData.push(node);
      this.setState({
        treeData
      });
      return;
    }

    const pushTreeNode = (datas: ExplorerTreeNodeProps[]) => {
      let hasResult = false;
      for (let i = 0, len = datas.length; i < len; i++) {
        const data = datas[i];
        if (data.key === pNodeKey) {
          data.children = data.children || [];
          data.children.push(node);
          hasResult = true;
        } else if (data.children) {
          hasResult = pushTreeNode(data.children);
        }
        if (hasResult) {
          return hasResult;
        }
      }
      return hasResult;
    }

    if (pushTreeNode(treeData)) {
      this.setState({ treeData });
    }
  }

  /**
   * 删除节点
   * @param key 节点key
   */
  public removeNode(key: string) {
    if (!key) {
      return;
    }

    const removeTreeNode = (datas: ExplorerTreeNodeProps[]) => {
      let hasResult = false;
      for (let i = 0, len = datas.length; i < len; i++) {
        const data = datas[i];
        if (data.key === key) {
          datas.splice(i, 1);
          hasResult = true;
        } else if (data.children) {
          hasResult = removeTreeNode(data.children);
        }
        if (hasResult) {
          return hasResult;
        }
      }
      return hasResult;
    }

    const treeData = this.state.treeData.slice();
    if (removeTreeNode(treeData)) {
      this.setState({ treeData });
    }
  }

  /**
   * 修改节点数据
   * @param key 节点key
   * @param node 新节点数据
   * @param replace 是否替换节点数据
   */
  public modifyNode(key: string, node: ExplorerTreeNodeProps, replace: boolean = false) {
    if (!key || !node) {
      return;
    }

    const modifyNode = (datas: ExplorerTreeNodeProps[], key: string, node: ExplorerTreeNodeProps, replace: boolean) => {
      let hasResult = false;
      for (let i = 0, len = datas.length; i < len; i++) {
        const data = datas[i];
        if (data.key === key) {
          datas[i] = replace ? node : { ...datas[i], ...node };
          hasResult = true;
        } else if (data.children) {
          hasResult = modifyNode(data.children, key, node, replace);
        }
        if (hasResult) {
          return hasResult;
        }
      }
      return hasResult;
    }

    const treeData = this.state.treeData.slice();
    if (modifyNode(treeData, key, node, replace)) {
      this.setState({ treeData });
    }
  }

  /**
   * 重命名节点
   * @param key 节点key
   * @param newName 待修改的节点name
   * @param syncKey 是否同步key修改
   */
  public renameNode(key: string, newName: string, syncKey: boolean = false) {
    if (!key || !name) {
      return;
    }

    const node = syncKey ? {
      name: newName,
      key: newName
    } : {
      name: newName
    } as ExplorerTreeNodeProps;

    this.modifyNode(key, node, false);
  }

  public render() {
    const { sourceData = [], nodeComponent = TreeNode, ...props } = this.props;
    this.nodeComponent = nodeComponent;

    // TODO: 带搜索框的资源树
    return (
      <Tree {...props}>
        {this.state.treeData.map(d => this.renderTreeNode(d))}
      </Tree>
    );
  }

  private renderTreeNode(args: ExplorerTreeNodeProps) {
    const { key, children, ...props } = args;
    const NodeComponent = this.nodeComponent;

    return children ? (
      <NodeComponent key={key} {...props}>
        {children.map(c => this.renderTreeNode(c))}
      </NodeComponent>
    ) : <NodeComponent key={key} {...props} />;
  }
} 
