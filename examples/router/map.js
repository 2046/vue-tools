export default {
    '/cell': {
        component: (resolve) => {require(['pages/cell'], resolve)}
    },
    '/swipe': {
        component: (resolve) => {require(['pages/swipe'], resolve)}
    },
    '/popup': {
        component: (resolve) => {require(['pages/popup'], resolve)}
    },
    '/icon': {
        component: (resolve) => {require(['pages/icon'], resolve)}
    },
    '/alert': {
        component: (resolve) => {require(['pages/alert'], resolve)}
    },
    '/confirm': {
        component: (resolve) => {require(['pages/confirm'], resolve)}
    }
}
