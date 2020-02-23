"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const user = await this.ctx.model.User.findAll();
    ctx.body = {
      result: user
    };
  }
}

module.exports = UserController;
