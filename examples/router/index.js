import Vue from 'vue'
import routes from './map'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: Object.keys(routes).reduce((previous, current) => {
        return (previous.push({path: current, component: routes[current].component}), previous)
    }, []),
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
