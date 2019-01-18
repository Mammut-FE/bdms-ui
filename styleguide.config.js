const redoc = require('react-docgen-typescript');
const _ = require('lodash');
const path = require('path');

const package = require('./package');

const DEV = process.env.NODE_ENV !== 'production';

function createComponetPaths(...componentPath) {
  return componentPath.map(name => `src/components/${name}.tsx`);
}

function createComponentSection(name, publicComponents, privateComponents, sections) {
  if (DEV) {
    return {
      name,
      components: createComponetPaths(...publicComponents),
      sections: [
        {
          name: '内部组件',
          components: createComponetPaths(...privateComponents)
        },
        ...(sections || [])
      ]
    };
  }

  return {
    name,
    components: createComponetPaths(...publicComponents),
    sections: sections || []
  };
}

function upperCamelCase(name) {
  return _.upperFirst(_.camelCase(name));
}

module.exports = {
  propsParser: redoc.withDefaultConfig({
    propFilter: props => {
      return props.parent;
    },
    componentNameResolver: (exp, source) => {
      const tags = exp.getJsDocTags();
      let parent = '';
      let title = '';
      let name = '';
      for (const tag of tags) {
        if (tag.name === 'title') {
          // 暂时不用 Title 感觉会产生一些问题
          title = tag.text;
        } else if (tag.name === 'parent') {
          parent = tag.text;
        } else if (tag.name === 'name') {
          name = tag.text;
        }
      }

      name = name || upperCamelCase(redoc.getDefaultExportForFile(source));

      if (parent) {
        name = `${parent}.${name}`;
      }

      if (title) {
        name = `${name}(${title})`;
      }

      return name;
    }
  }).parse,
  getComponentPathLine(componentPath) {
    const name = upperCamelCase(path.basename(componentPath, '.tsx'));
    return `import { ${name} } from '${package.name}'`;
  },
  webpackConfig: require('./configs/webpack.start.js'),
  styleguideDir: 'docs',
  usageMode: 'expand',
  exampleMode: 'collapse',
  pagePerSection: true,
  // 引入一下全局的 scss 文件，不知道为啥他无法生效，必须要手动 require 一下
  require: [path.join(__dirname, './src/index.scss')],
  sections: [
    {
      name: 'Introduction',
      content: 'README.md'
    },
    {
      name: 'Code Style',
      content: 'CODE_STYLE.md'
    },
    {
      name: 'Utils'
    },
    {
      name: '组件',
      sections: [
        // 请将新组件添加到对应的分类当中， 最好区分内部组件和公开组件，内部组件只是被内部使用，公开组件可以被内部和外部使用。
        // 内部组件的只有在开发模式下才会显示，生产环境下不显示内部组件的文档。
        // 如果你的组件只是一些函数，比如说 message、notice 之类，那么请创建对应的 Markdown 文档作为 Section 显示
        // 组件的路径为 `component-folder/component-file`，不需要写 .tsx 后缀，但是要精确到那个组件
        createComponentSection('Helper', [], ['helpers/DropdownTrigger']),
        createComponentSection('通用', ['icon/icon'], []),
        createComponentSection(
          '布局',
          [
            // 'grid/',
            'layout/layout'
          ],
          []
        ),
        createComponentSection(
          '导航',
          ['menu/menu', 'menu/menuItem', 'menu/menuItemGroup', 'menu/subMenu', 'menu/divider'],
          ['menu/menuWrap']
        ),
        createComponentSection(
          '表单',
          [
            'button/button',
            'button/buttonGroup',
            'date-picker/DatePicker',
            'date-picker/DateRangePicker',
            'time-picker/TimePicker',
            'input/Input',
            'checkbox/checkbox',
            'checkbox/checkboxGroup',
            'switch/switch'
          ],
          ['date-picker/DateTime', 'time-picker/TimePickerDropdown']
        ),
        createComponentSection('数据展示', ['tag/tag'], []),
        createComponentSection(
          '反馈提示',
          [
            'tooltip/Tooltip'
            // 'message',
            // 'notice',
          ],
          []
        ),
        createComponentSection('其他', [], [])
      ],
      sectionDepth: 3
    }
  ]
};
