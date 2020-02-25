/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "";

  // add your middleware config here
  config.middleware = [];

  config.onerror = {
    accepts() {
      return "json";
    },
    json(err, ctx) {
      ctx.body = { error: { code: -32603, message: err.message } };
      ctx.status = 200;
    }
  };

  config.sequelize = {
    dialect: "",
    database: "",
    host: "",
    port: 3306,
    username: "",
    password: ""
  };

  config.cors = {
    enable: true,
    package: "egg-cors"
  };

  return {
    ...config,
  };
};
