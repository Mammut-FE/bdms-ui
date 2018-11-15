import demos from './component'
import { buildDemo } from './demo';
import PlaygroundChecker from './PlaygroundChecker';

const routers = demos.map(demo => ({
  path: '/' + demo.name,
  component: buildDemo(demo)
}))

routers.unshift({
  path: '/playground',
  component: PlaygroundChecker
})

export default routers
