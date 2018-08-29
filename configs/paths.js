const path = require('path');

const rootPath = path.resolve(__dirname, '../');

module.exports = {
  rootPath,
  appRoot: path.join(rootPath, 'example'),
  appIndex: path.join(rootPath, 'example/index.tsx'),
  libIndex: path.join(rootPath, 'src/index.ts'),
  libOut: path.join(rootPath, 'lib'),
  tmpOut: path.join(rootPath, 'tmp-out'),
  devTsconfig: path.join(rootPath, 'tsconfig.json')
};
