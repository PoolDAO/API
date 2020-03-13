"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/msgs", controller.msg.index);
  router.get("/msgs/:user", controller.msg.findByUser);
  router.get("/node", controller.node.index);
  router.get("/node/:nodeId", controller.node.findByNodeId);
  router.get("/node/my/:owner", controller.node.findByOwner);
  router.get("/operators", controller.operator.findOperators);
  router.get("/operators/:operatorId", controller.operator.findOperatorDetail);
  router.get("/overview/", controller.overview.index);
  router.get("/overview/:user", controller.overview.findByUser);
  router.get("/user", controller.user.index);
  router.get("/user/:user", controller.user.findByUser);
};
