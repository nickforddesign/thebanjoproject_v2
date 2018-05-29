import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/narratives',
      name: 'Narratives',
      component(resolve) {
        require(['@/views/narratives'], resolve)
      }
    },
    {
      path: '/narratives/:slug',
      name: 'Narrative',
      component(resolve) {
        require(['@/views/narratives/view'], resolve)
      }
    },
    {
      path: '/players',
      name: 'Players',
      component(resolve) {
        require(['@/views/players'], resolve)
      },
      children: [
        {
          path: ':slug',
          name: 'Player',
          component(resolve) {
            require(['@/views/players/profile'], resolve)
          }
        }
      ]
    },
    {
      path: '/maps',
      name: 'Maps',
      component(resolve) {
        require(['@/views/maps/'], resolve)
      }
    },
    {
      path: '/maps/:region',
      name: 'Map',
      component(resolve) {
        require(['@/views/maps/region'], resolve)
      }
    },
    {
      path: '/timelines',
      name: 'Timelines',
      component(resolve) {
        require(['@/views/timelines/'], resolve)
      },
      children: [
        {
          path: ':slug',
          name: 'Timeline',
          component(resolve) {
            require(['@/views/timelines/view'], resolve)
          }
        }
      ]
    },
    {
      path: '/videos',
      name: 'Videos',
      component(resolve) {
        require(['@/views/videos'], resolve)
      },
      children: [
        {
          path: ':slug',
          name: 'Video',
          component(resolve) {
            require(['@/views/videos/view'], resolve)
          }
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component(resolve) {
        require(['@/views/search'], resolve)
      }
    },
    {
      path: '/search/:term',
      name: 'Search',
      component(resolve) {
        require(['@/views/search'], resolve)
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('pause')
  next()
})

export default router
