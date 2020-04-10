const router = {
    name: 'center',
    path: '/center',
    component: () => import('_views/center'),
    meta: {
        keepAlive: true
    }
};

export default router;
