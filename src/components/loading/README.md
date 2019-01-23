# Loading 加载进度条组件

## Props

| 名称             | 类型                                                                                   | 描述                                          | 默认值    |
| ---------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- | --------- |
| delay            | number                                                                                 | 延迟显示时间，单位 `ms`                       | `0`       |
| indicator        | 'circle' &#x7c; 'cube' &#x7c; (props: {size: string}) => ReactNode &#x7c; ReactElement | 加载指示器，支持使用内置或者自定义类型        | 'circle'  |
| size             | 'small' &#x7c; 'normal' &#x7c; 'large'                                                 | 加载指示器的大小                              | 'normal'  |
| loading          | boolean                                                                                | 是否处于加载状态，用于可控使用                | true      |
| tip              | ReactNode                                                                              | 在指示器旁边显示简短的提示信息                | ''        |
| message          | ReactNode                                                                              | 在有容器的情况下在指示器下方显示的信息        | ''        |
| fullscreen       | boolean                                                                                | 全屏显示加载信息                              | false     |
| wrapperClassName | string                                                                                 | 包裹容器的类                                  | ''        |
| timeout          | number                                                                                 | 超时时间，不包过 delay 的时间，0 为不设置超时 | 0         |
| onTimeout        | () => void;                                                                            | 超时的回调                                    | undefined |

## Basic Usage

### 单独使用

```jsx
<Loading />
```

### 作为包裹的容器使用

```jsx
<Loading>
  <div />
</Loading>
```
