import { Demo } from '../Demo';

import buttonSamples from './button';
import switchSamples from './switch';
import layoutSamples from './layout';
import iconStamples from './icon';
import checkboxSamples from './checkbox';
import tagSamples from './tag';
import menuSamples from './menu';
import inputSamples from './input';
import datePickerSamples from './date-picker';
import tooltipSamples from './tooltip';
import selectSamples from './select';

const demos: Demo[] = [
  {
    name: 'layout',
    title: 'Layout 布局',
    description: '布局',
    samples: layoutSamples
  },
  {
    name: 'icon',
    title: 'Icon 图标',
    description: '图标',
    samples: iconStamples
  },
  {
    name: 'button',
    title: 'Button 按钮',
    description: '按钮',
    samples: buttonSamples,
    col: 6
  },
  {
    name: 'switch',
    title: 'Switch 开关',
    description: '开关',
    samples: switchSamples
  },
  {
    name: 'checkbox',
    title: 'Checkbox 多选框',
    description: '多选框',
    samples: checkboxSamples,
    col: 6
  },
  {
    name: 'tag',
    title: 'Tag 标签',
    description: '标签',
    samples: tagSamples
  },
  {
    name: 'menu',
    title: 'Menu 菜单',
    description: '菜单',
    samples: menuSamples
  },
  {
    name: 'input',
    title: 'Input 输入框',
    description: '输入框',
    samples: inputSamples,
    col: 6
  },
  {
    name: 'select',
    title: 'Select 下拉框',
    description: '下拉框',
    samples: selectSamples
  },
  {
    name: 'date-picker',
    title: 'DatePicker 时间选择器',
    description: '时间选择器',
    samples: datePickerSamples,
    col: 6
  },
  {
    name: 'tooltip',
    title: 'Tooltip 工具提示',
    description: '工具提示',
    samples: tooltipSamples,
    col: 6
  }
];

export default demos;
