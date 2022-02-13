import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		meta: {
			crumb: 'Homepage'
		},
		component: Home
	},
	{
		path: '/recover',
		name: 'Recover',
		component: () => (/* webpackChunkName: recovery */ import("@/views/Recover.vue"))
	},
	{
		path: '/change-password',
		name: 'ChangePassword',
		component: () => (/* webpackChunkName: recovery */ import("@/views/ChangePassword.vue"))
	},
	{
		path: '/cart',
		name: 'cart',
		meta: {
			crumb: 'Your Cart'
		},
		component: Cart 
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
