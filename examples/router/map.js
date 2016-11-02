export default {
    '/': {
        component: (resolve) => {require(['pages/index'], resolve)}
    },
    '/components/cell': {
        component: (resolve) => {require(['pages/components/cell'], resolve)}
    },
    '/components/wipe': {
        component: (resolve) => {require(['pages/components/swipe'], resolve)}
    },
    '/components/popup': {
        component: (resolve) => {require(['pages/components/popup'], resolve)}
    },
    '/components/icon': {
        component: (resolve) => {require(['pages/components/icon'], resolve)}
    },
    '/components/alert': {
        component: (resolve) => {require(['pages/components/alert'], resolve)}
    },
    '/components/confirm': {
        component: (resolve) => {require(['pages/components/confirm'], resolve)}
    },
    '/components/toast': {
        component: (resolve) => {require(['pages/components/toast'], resolve)}
    },
    '/components/loading': {
        component: (resolve) => {require(['pages/components/loading'], resolve)}
    },
    '/components/modal': {
        component: (resolve) => {require(['pages/components/modal'], resolve)}
    },
    '/components/validator': {
        component: (resolve) => {require(['pages/components/validator'], resolve)}
    },
    '/components/infinite': {
        component: (resolve) => {require(['pages/components/infinite'], resolve)}
    },
    '/components/video': {
        component: (resolve) => {require(['pages/components/video'], resolve)}
    },
    '/components/header': {
        component: (resolve) => {require(['pages/components/header'], resolve)}
    },
    '/components/layout': {
        component: (resolve) => {require(['pages/components/layout'], resolve)}
    },
    '/components/switch': {
        component: (resolve) => {require(['pages/components/switch'], resolve)}
    },
    '/components/checklist': {
        component: (resolve) => {require(['pages/components/checklist'], resolve)}
    },
    '/plugins/alert': {
        component: (resolve) => {require(['pages/plugins/alert'], resolve)}
    },
    '/plugins/confirm': {
        component: (resolve) => {require(['pages/plugins/confirm'], resolve)}
    },
    '/plugins/loading': {
        component: (resolve) => {require(['pages/plugins/loading'], resolve)}
    },
    '/plugins/toast': {
        component: (resolve) => {require(['pages/plugins/toast'], resolve)}
    },
    '/plugins/env': {
        component: (resolve) => {require(['pages/plugins/env'], resolve)}
    },
    '/plugins/cookie': {
        component: (resolve) => {require(['pages/plugins/cookie'], resolve)}
    },
    '/plugins/eventBus': {
        component: (resolve) => {require(['pages/plugins/eventBus'], resolve)}
    },
    '/plugins/ajax': {
        component: (resolve) => {require(['pages/plugins/ajax'], resolve)}
    }
}
