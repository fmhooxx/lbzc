const router = {
    name: 'home',
    path: '/home',
    component: () => import('_views/home'),
    meta: {
        keepAlive: true
    }
};

export default router;
