const router = {
    name: "card",
    path: "/Daibeishop/xinTui",
    component: () => import("_views/card"),
    meta: {
        main: true,
        keepAlive:true
    }
};

export default router;
