const router = {
    name: 'zx',
    path: '/zx',
    component: () => import('_views/cha'),
    meta: {
        main: true,
        keepAlive: true
    }
};

export default router;
