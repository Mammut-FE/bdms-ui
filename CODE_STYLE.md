# 代码规范

## 结构规范

TODO

## 命名规范

### 组件文件名必须采用大驼峰形式

正确: `Input.tsx`, `DatePicker.tsx`  
错误: `menu.tsx`, `menu-item.tsx`

有利于 styleguidist 区分那些是组件，那些是库文件。

### 其他文件(夹)无特殊情况必须采用 kabab-case

正确: `input/Input.tsx` `date-picker/date-picker.scss`
错误: `Icon/icon.tsx` `menu_item.scss`
