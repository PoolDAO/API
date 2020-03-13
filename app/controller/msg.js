"use strict";

const Controller = require("egg").Controller;

class MsgController extends Controller {
  async index() {
    const { ctx } = this;
    const msg = await ctx.model.Msg.findAll({
      order: [["time", "DESC"]],
      limit: 10
    });
    ctx.body = {
      result: msg
    };
  }

  async findByUser() {
    const { ctx } = this;
    const msg = await ctx.model.Msg.findAll({
      where: { user: ctx.params.user },
      order: [["time", "DESC"]],
      limit: 10
    });
    ctx.body = {
      result: msg
    };
  }
}

module.exports = MsgController;
