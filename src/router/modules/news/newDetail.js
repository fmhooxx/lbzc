const router = {
    name: 'newDetail',
    path: '/newDetail',
    component: () => import('_views/news/newDetail'),
    meta: {
        main: true
    }
};

export default router;
