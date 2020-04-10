const router = {
    name: 'share',
    path: '/share',
    meta: {
        main: true,
        keepAlive: true
    },
    component: () => import('_views/share')
};

export default router;
