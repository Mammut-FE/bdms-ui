import * as React from 'react';

export const requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
  return setTimeout(arguments[0], 10);
}

export const scrollAnimation = (el, orientation: 'up' | 'down', targetScroll) => {
  const timeinterval = setInterval(() => {
    if (orientation === 'down') {
      el.scrollTop += 10;
      if (el.scrollTop >= targetScroll) {
        el.scrollTop = targetScroll;
        clearInterval(timeinterval);
      }
    } else {
      el.scrollTop -= 10;
      if (el.scrollTop <= targetScroll) {
        el.scrollTop = targetScroll;
        clearInterval(timeinterval);
      }
    }
  }, 10);
};

/**
 * 根据时间平滑滚动，使用 requestAnimationFrame 保证性能
 */
export function smoothScroll(el: HTMLElement, targetTop: number, duration = 300) {
  let prevTime = Date.now()
  const endTime = prevTime + duration

  const doOnceScroll = () => {
    const now = Date.now()
    const restTime = endTime - now
    const waitTime = now - prevTime
    prevTime = now

    if (restTime < 0) {
      el.scrollTop = targetTop
      return
    }

    // 通过计算上一次运行和这次运行的时间差，从而计算出这一次应该移动的距离。
    // 会延迟一帧发生滚动，但是在一般的机器上是看不出什么区别
    el.scrollTop += Math.floor((targetTop - el.scrollTop) * (waitTime / (restTime + waitTime)))
    requestAnimationFrame(doOnceScroll)
  }

  requestAnimationFrame(doOnceScroll)
}

/**
 * 尝试获取有可能为函数的组件，如果是普通组件，那么直接返回，否则是函数工厂，调用后返回组件
 * @param node
 */
export function tryGetFuntionalNode(node: React.ReactNode | (() => React.ReactNode)): React.ReactNode {
  return typeof node === 'function' ? node() : node
}
