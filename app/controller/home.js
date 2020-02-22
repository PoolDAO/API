"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const users = await this.ctx.model.User.findAll();
    ctx.body = "hi, egg";
  }
}

module.exports = HomeController;
