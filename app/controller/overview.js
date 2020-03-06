"use strict";
const poolDaoError = require('../helper/poolDaoError');

const Controller = require("egg").Controller;

class OverviewController extends Controller {
  async index() {
    const { ctx } = this;
    const overview = await ctx.model.Overview.findAll();
    ctx.body = {
      result: overview || []
    };
  }

  async findByUser() {
    const { ctx } = this;
    const overview = await ctx.model.Overview.findByUser(ctx.params.user);
    if (overview === null) {
      ctx.body = {
        error: {
          code: -32001,
          message: `Can't find overview of user ${ctx.params.user}.`
        }
      };
    } else {
      ctx.body = {
        result: overview
      };
    }
  }
}

module.exports = OverviewController;
