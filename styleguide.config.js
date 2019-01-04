const redoc = require('react-docgen-typescript');

function componentPaths(...names) {
  return names.map(name => `src/components/${name}/*.tsx`);
}

module.exports = {
  propsParser: redoc.withDefaultConfig({
    componentNameResolver: (exp, source) => {
      const tags = exp.getJsDocTags();
      let parent = '';
      let title = '';
      let name = '';
      for (const tag of tags) {
        if (tag.name === 'title') {
          title = tag.text;
        } else if (tag.name === 'parent') {
          parent = tag.text;
        } else if (tag.name === 'name') {
          name = tag.text;
        }
      }

      name = name || redoc.getDefaultExportForFile(source);
      if (parent) {
        name = `${parent}.${name}`;
      }
      if (title) {
        name = `${name} ${title}`;
      }

      return name;
    }
  }).parse,
  webpackConfig: require('./configs/webpack.start.js'),
  styleguideDir: 'docs',
  // components: 'src/components/**/*.tsx',
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
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
      name: '组件',
      sections: [
        {
          name: '通用'
          // components: componentPaths('icon')
        },
        {
          name: '布局'
          // components: componentPaths('grid', 'layout')
        },
        {
          name: '导航',
          components: componentPaths('menu')
        },
        {
          name: '表单'
          // components: componentPaths('button', 'date-picker', 'time-picker', 'input', 'checkbox', 'switch')
        },
        {
          name: '数据展示'
          // components: componentPaths('tag')
        },
        {
          name: '反馈提示'
          // components: componentPaths('tooltip', 'message', 'notice')
        },
        {
          name: '其他'
        }
      ],
      sectionDepth: 3
    }
  ]
};
