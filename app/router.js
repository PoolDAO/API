"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/msg", controller.msg.index);
  router.get("/node", controller.node.index);
  router.get("/node/:owner", controller.node.findByOwner);
  router.get("/operator", controller.operator.index);
  router.get("/overview/", controller.overview.index);
  router.get("/overview/:user", controller.overview.findByUser);
  router.get("/user", controller.user.index);
};
