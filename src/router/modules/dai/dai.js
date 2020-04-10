const router = {
    name: "dai",
    path: "/Daibeishop/platweb",
    component: () => import("_views/dai"),
    meta: {
        main: true,
        keepAlive:true

    }
};

export default router;
