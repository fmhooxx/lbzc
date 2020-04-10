const router = {
    name: 'postSearch',
    path: '/postSearch',
    component: () => import('_views/bbs/postSearch'),
    meta: {
        keepAlive: true
    }
};

export default router;
