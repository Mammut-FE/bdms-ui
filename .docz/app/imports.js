export const imports = {
  'src/components/button/button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-button-button" */ 'src/components/button/button.mdx'),
}
