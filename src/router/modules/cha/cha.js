const router = {
    name: 'chaZheng',
    path: '/chaZheng',
    component: () => import('_views/cha'),
    meta: {
        main: true,
        keepAlive: true
    }
};

export default router;
