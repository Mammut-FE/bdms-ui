# button 按钮

## API

| 属性     | 说明                                                  | 类型     | 默认值  |
| -------- | ----------------------------------------------------- | -------- | ------- |
| icon     | 设置按钮的图标类型                                    | string   | -       |
| disabled | 按钮失效状态                                          | boolean  | false   |
| type     | 设置按钮类型，可选值为 primary default text 或者不设  | string   | default |
| size     | 设置按钮大小，可选值为 small normal 或者不设          | string   | normal  |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string   | -       |
| target   | 相当于 a 链接的 target 属性，href 存在时生效          | string   | -       |
| onClick  | click 事件的 handler                                  | function | -       |
