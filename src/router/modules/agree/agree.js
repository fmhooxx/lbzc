const router = {
    name: "agree",
    path: "/agree",
    component: () => import("_views/agree"),
    meta: {
        main: true
    }
};

export default router;
