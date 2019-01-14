import { Children } from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import { TreeNode } from './tree-node';

export const arrDel = (arr: string[], value: string) => {
  const clone = arr.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

export const arrAdd = (arr: string[], value: string) => {
  const clone = arr.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

export const mapChildren = (children: any, func: (node: any) => void) => {
  const list = toArray(children).map(func);
  return list && list.length === 1 ? list[0] : list;
}

export interface TreeNodeEntity {
  node?: any;
  index?: number;
  key?: string;
  pos: string;
  parent?: TreeNodeEntity;
  parentPos?: string;
  children?: TreeNodeEntity[];
}

export const getNodeChildren = (children: any) => {
  return toArray(children).filter((node: any) => node && node.type && node.type.isTreeNode);
}

const traverseTreeNodes = (treeNodes: any, callback: (data: TreeNodeEntity) => void) => {
  const getPosition = (level: string | number, index?: number): string => {
    return `${level}-${index}`;
  }

  const processNode = (node: any, index?: number, parent?: TreeNodeEntity) => {
    const children = node ? node.props.children : treeNodes;
    const pos = node && parent ? getPosition(parent.pos, index) : '0';

    const childList = getNodeChildren(children);

    if (node) {
      const data = {
        node, index, pos,
        key: node.key || pos,
        parentPos: parent && parent.node ? parent.pos : '',
      };

      callback(data);
    }

    Children.forEach(childList, (subNode, subIndex) => {
      processNode(subNode, subIndex, { node, pos });
    });
  }

  processNode(null);
}

export function convertTreeToEntities(treeNodes: any) {
  const posEntities = {};
  const keyEntities = {};

  traverseTreeNodes(treeNodes, (item: TreeNodeEntity) => {
    const { pos, key = '', parentPos = '' } = item;

    posEntities[pos] = item;
    keyEntities[key] = item;

    item.parent = posEntities[parentPos];
    if (item.parent) {
      item.parent.children = item.parent.children || [];
      item.parent.children.push(item);
    }
  });

  return keyEntities;
}

export const calcSelectedKeys = (selectedKeys: string[] = [], multiple: boolean = false) => {
  return multiple ? selectedKeys.slice() : (selectedKeys.length ? [selectedKeys[0]] : selectedKeys);
}

interface CheckedStatus {
  checkedKeys?: string[];
  halfCheckedKeys?: string[];
}

export function conductCheck(keyList: string[], isCheck: boolean, keyEntities: object, checkStatus: CheckedStatus = {}): CheckedStatus {
  const checkedKeys = {};
  const halfCheckedKeys = {};

  (checkStatus.checkedKeys || []).forEach((key: string) => checkedKeys[key] = true);
  (checkStatus.halfCheckedKeys || []).forEach((key: string) => halfCheckedKeys[key] = true);

  const isCheckDisabled = (node: TreeNode) => {
    const { disabled = false, disableCheckbox = false } = node.props || {};
    return !!(disabled || disableCheckbox);
  }

  const conductUp = (key: string) => {
    if (checkedKeys[key] === isCheck) {
      return;
    }

    const entity = keyEntities[key];
    if (!entity) {
      return;
    }

    const { children, parent, node } = entity;

    if (isCheckDisabled(node)) {
      return;
    }

    let everyChildChecked = true;
    let someChildChecked = false;

    (children || []).filter((child: TreeNodeEntity) => !isCheckDisabled(child.node)).forEach(({ key: childKey }) => {
      const childChecked = checkedKeys[childKey];
      const childHalfChecked = halfCheckedKeys[childKey];

      if (childChecked || childHalfChecked) {
        someChildChecked = true;
      }
      if (!childChecked) {
        everyChildChecked = false;
      }
    });

    checkedKeys[key] = isCheck ? everyChildChecked : false;
    halfCheckedKeys[key] = someChildChecked;

    parent && conductUp(parent.key);
  }

  const conductDown = (key: string = '') => {
    if (checkedKeys[key] === isCheck) {
      return;
    }

    const entity = keyEntities[key];
    if (!entity) {
      return;
    }

    const { children, node } = entity;

    if (isCheckDisabled(node)) {
      return;
    }

    checkedKeys[key] = isCheck;

    (children || []).forEach((child: TreeNodeEntity) => conductDown(child.key));
  }

  const conduct = (key: string) => {
    const entity = keyEntities[key];

    if (!entity) {
      return;
    }

    const { children, parent, node } = entity;
    checkedKeys[key] = isCheck;

    if (isCheckDisabled(node)) {
      return;
    }

    (children || []).filter((child: TreeNodeEntity) => !isCheckDisabled(child.node)).forEach((child: any) => conductDown(child.key));

    parent && conductUp(parent.key);
  }

  (keyList || []).forEach(key => conduct(key));

  const checkedKeyList: string[] = [];
  const halfCheckedKeyList: string[] = [];

  Object.keys(checkedKeys).forEach(key => checkedKeys[key] && checkedKeyList.push(key));
  Object.keys(halfCheckedKeys).forEach(key => !checkedKeys[key] && halfCheckedKeys[key] && halfCheckedKeyList.push(key));

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}
