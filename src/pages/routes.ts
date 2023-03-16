import { createRoutes } from "../router";

import Index from './index.md'

import OtherDocuments from './other.md'
import ProjectsIndex from './projects/index.md'

import ProjectsAsic from './projects/asic.md'
import ProjectsPlayground from './projects/playground.md'
import ProjectsBobber from './projects/bobber.md'
import ProjectsTestbed from './projects/testbed.md'
import ProjectsPrisum from './projects/prisum.md'
import ProjectsTester from './projects/tester.md'
import ProjectsTelem from './projects/telem.md'
import ProjectsSimulator from './projects/simulator.md'
import ProjectsMips from './projects/mips.md'
import ProjectsRoomba from './projects/roomba.md'
import ProjectsZedboard from './projects/zedboard.md'

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
        path: '/projects/asic',
        component: ProjectsAsic,
      },
      {
        path: '/projects/playground',
        component: ProjectsPlayground,
      },
      {
        path: '/projects/bobber',
        component: ProjectsBobber,
      },
      {
        path: '/projects/testbed',
        component: ProjectsTestbed,
      },
      {
        path: '/projects/prisum',
        component: ProjectsPrisum,
      },
      {
        path: '/projects/tester',
        component: ProjectsTester,
      },
      {
        path: '/projects/telem',
        component: ProjectsTelem,
      },
      {
        path: '/projects/simulator',
        component: ProjectsSimulator,
      },
      {
        path: '/projects/mips',
        component: ProjectsMips,
      },
      {
        path: '/projects/roomba',
        component: ProjectsRoomba,
      },
      {
        path: '/projects/zedboard',
        component: ProjectsZedboard,
      }
    ]
  },
  {
    path: '/other',
    component: OtherDocuments,
  }

])