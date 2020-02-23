"use strict";

const Controller = require("egg").Controller;

class MsgController extends Controller {
  async index() {
    const { ctx } = this;
    const msg = await this.ctx.model.Msg.findAll({ order: [['time', 'DESC']] });
    ctx.body = {
      result: msg
    };
  }
}

module.exports = MsgController;
