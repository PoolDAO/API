"use strict";

const Controller = require("egg").Controller;

class OverviewController extends Controller {
  async index() {
    const { ctx } = this;
    const overview = await this.ctx.model.Overview.findAll();
    ctx.body = {
      overview: overview
    };
  }
}

module.exports = OverviewController;
