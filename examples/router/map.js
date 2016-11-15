export default {
    '/': {
        component: (resolve) => {require(['pages/index'], resolve)}
    },
    '/component/cell': {
        component: (resolve) => {require(['pages/component/cell'], resolve)}
    },
    '/component/wipe': {
        component: (resolve) => {require(['pages/component/swipe'], resolve)}
    },
    '/component/popup': {
        component: (resolve) => {require(['pages/component/popup'], resolve)}
    },
    '/component/icon': {
        component: (resolve) => {require(['pages/component/icon'], resolve)}
    },
    '/component/alert': {
        component: (resolve) => {require(['pages/component/alert'], resolve)}
    },
    '/component/confirm': {
        component: (resolve) => {require(['pages/component/confirm'], resolve)}
    },
    '/component/toast': {
        component: (resolve) => {require(['pages/component/toast'], resolve)}
    },
    '/component/loading': {
        component: (resolve) => {require(['pages/component/loading'], resolve)}
    },
    '/component/modal': {
        component: (resolve) => {require(['pages/component/modal'], resolve)}
    },
    '/component/validator': {
        component: (resolve) => {require(['pages/component/validator'], resolve)}
    },
    '/component/infinite': {
        component: (resolve) => {require(['pages/component/infinite'], resolve)}
    },
    '/component/video': {
        component: (resolve) => {require(['pages/component/video'], resolve)}
    },
    '/component/header': {
        component: (resolve) => {require(['pages/component/header'], resolve)}
    },
    '/component/layout': {
        component: (resolve) => {require(['pages/component/layout'], resolve)}
    },
    '/component/switch': {
        component: (resolve) => {require(['pages/component/switch'], resolve)}
    },
    '/component/checklist': {
        component: (resolve) => {require(['pages/component/checklist'], resolve)}
    },
    '/component/upload': {
        component: (resolve) => {require(['pages/component/upload'], resolve)}
    },
    '/component/progress': {
        component: (resolve) => {require(['pages/component/progress'], resolve)}
    },
    '/plugin/alert': {
        component: (resolve) => {require(['pages/plugin/alert'], resolve)}
    },
    '/plugin/confirm': {
        component: (resolve) => {require(['pages/plugin/confirm'], resolve)}
    },
    '/plugin/loading': {
        component: (resolve) => {require(['pages/plugin/loading'], resolve)}
    },
    '/plugin/toast': {
        component: (resolve) => {require(['pages/plugin/toast'], resolve)}
    },
    '/plugin/env': {
        component: (resolve) => {require(['pages/plugin/env'], resolve)}
    },
    '/plugin/cookie': {
        component: (resolve) => {require(['pages/plugin/cookie'], resolve)}
    },
    '/plugin/eventBus': {
        component: (resolve) => {require(['pages/plugin/eventBus'], resolve)}
    },
    '/plugin/ajax': {
        component: (resolve) => {require(['pages/plugin/ajax'], resolve)}
    }
}
