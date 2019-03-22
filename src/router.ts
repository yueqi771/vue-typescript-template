import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
            path: '/',
            redirect: '/preview',
        },
		{
			path: '/preview',
			name: 'preview',
			component: () => import('./views/Preview.vue'),
			children: [
                {
                    path: '/preview',
                    redirect: '/preview/page',
                },
                {
                    path: '/preview/:path',
                    component: () => import('./views/Preview.vue'),
                },
            ]
		},

	]
})
