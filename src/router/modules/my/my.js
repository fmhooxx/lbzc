const router = {
    name: 'my',
    path: '/my',
    component: () => import('_views/my'),
    meta: {
        main: true,
        keepAlive: true
    }
};

export default router;
