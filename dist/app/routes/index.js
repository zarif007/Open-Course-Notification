"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_route_1 = require("../modules/notification/notification.route");
const router = (0, express_1.Router)();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const moduleRoutes = [
    {
        path: '/notification',
        route: notification_route_1.notificationRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
