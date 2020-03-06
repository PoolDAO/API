"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();
    ctx.body = {
      result: user
    };
  }

  async findByUser() {
    const { ctx } = this;
    const user = await ctx.model.User.findByUser(ctx.params.user);
    if (user === null) {
      ctx.body = {
        error: {
          code: -32001,
          message: `Can't find user ${ctx.params.user}.`
        }
      };
    } else {
      ctx.body = {
        result: user
      };
    }
  }
}

module.exports = UserController;
