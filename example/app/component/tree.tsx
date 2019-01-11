import React from 'react';
import { Tree } from '../../../src';
import { Samples } from '../Demo';

const TreeNode = Tree.TreeNode;

const samples: Samples = [{
  title: '基本',
  description: '基本树形结构',
  component: () => {
    return (
      <Tree defaultExpandedKeys={['0-0-0', '0-0-1']}>
        <TreeNode name="parent 1" key="0-0">
          <TreeNode name="parent 1-0" key="0-0-0">
            <TreeNode name="leaf" key="0-0-0-0" />
            <TreeNode name="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode name="parent 1-1" key="0-0-1">
            <TreeNode name="sss" key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}, {
  title: '带Icon',
  description: '带Icon的树形结构',
  component: () => {
    return (
      <Tree>
        <TreeNode icon="folder-open" name="parent 1" key="0-0">
          <TreeNode icon="folder-open" name="parent 1-0" key="0-0-0">
            <TreeNode icon="file-mini" name="leaf" key="0-0-0-0" />
            <TreeNode icon="file-mini" name="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode icon="folder-open" name="parent 1-1" key="0-0-1">
            <TreeNode icon="file-mini" name="sss" key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}, {
  title: '可勾选',
  description: '可勾选的树形结构',
  component: () => {
    return (
      <Tree checkable={true}>
        <TreeNode icon="folder-open" name="parent 1" key="0-0">
          <TreeNode icon="folder-open" name="parent 1-0" key="0-0-0">
            <TreeNode icon="file-mini" name="leaf" key="0-0-0-0" />
            <TreeNode icon="file-mini" name="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode icon="folder-open" name="parent 1-1" key="0-0-1">
            <TreeNode icon="file-mini" name="sss" key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}, {
  title: '带注释',
  description: '子节点无图标带注释',
  component: () => {
    return (
      <Tree>
        <TreeNode icon="folder-open" name="parent 1" key="0-0">
          <TreeNode icon="folder-open" name="parent 1-0" key="0-0-0" description="父节点1">
            <TreeNode name="leaf" key="0-0-0-0" description="子节点" />
            <TreeNode name="leaf" key="0-0-0-1" description="Node" />
          </TreeNode>
          <TreeNode icon="folder-open" name="parent 1-1" key="0-0-1" description="父节点2">
            <TreeNode name="sss" key="0-0-1-0" description="Task" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}, {
  title: '可拖拽',
  description: '可拖拽的树形结构',
  component: () => {
    return (
      <Tree draggable={true}>
        <TreeNode name="parent 1" key="0-0">
          <TreeNode name="parent 1-0" key="0-0-0">
            <TreeNode name="leaf" key="0-0-0-0" />
            <TreeNode name="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode name="parent 1-1" key="0-0-1">
            <TreeNode name="sss" key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}];

export default samples;
