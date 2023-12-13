"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dicussion_route_1 = require("../modules/discussion/dicussion.route");
const router = (0, express_1.Router)();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const moduleRoutes = [
    {
        path: '/discussion',
        route: dicussion_route_1.discussionRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
