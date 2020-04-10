const router = {
    name: 'news',
    path: '/news',
    component: () => import('_views/news'),
    meta: {
        keepAlive: true
    }
};

export default router;
