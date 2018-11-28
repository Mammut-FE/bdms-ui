/**
 * 解决 classnames 无法添加前缀的问题
 */

import cn from 'classnames'

export function bemClassnames(blockName: string) {
  return (...args: any[]) => {
    if (!args.length) {
      return blockName
    }
    return cn(...args).split(' ').map(cls => {
      if (cls[0] === '_') {
        // is Modifier, '_a-b' => 'block-name--a-b'
        return `${blockName}--${cls.slice(1)}`
      } else if (cls[0] === '$') {
        // global class '$ant-btn' => 'ant-btn'
        return cls.slice(1)
      } else if (cls === '@') {
        // block name '@' => 'block-name'
        return blockName
      } else {
        // normal element 'wrapper' => 'block-name__wrapper'
        return `${blockName}__${cls}`
      }
    }).join(' ')
  }
}
