export default {
    '/demo': {
        component: (resolve) => {require(['pages/demo'], resolve)}
    },
    '/bar': {
        component: (resolve) => {require(['pages/demo2'], resolve)}
    }
}
