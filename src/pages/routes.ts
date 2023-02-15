import { createRoutes } from "../router";

import Index from './index.md'
import ProjectsIndex from './projects/index.md'
import ProjectsTest from './projects/test.md'

export default createRoutes([
  {
    path: '/',
    component: Index
  },
  {
    path: '/projects',
    children: [
      {
        path: '',
        component: ProjectsIndex
      },
      {
        path: '/projects/test',
        component: ProjectsTest
      },
    ]
  },
  
])