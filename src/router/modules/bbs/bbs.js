const router = {
    name: "bbs",
    path: "/bbs",
    component: () => import("_views/bbs"),
    meta: {
        keepAlive:true
    }
};

export default router;
