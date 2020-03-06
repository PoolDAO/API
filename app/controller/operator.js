"use strict";

const Controller = require("egg").Controller;

class OperatorController extends Controller {
  async index() {
    const { ctx } = this
    const operator = await ctx.model.Operator.findAll({ order: [['id', 'DESC']] });
    ctx.body = {
      result: operator
    };
  }
}

module.exports = OperatorController;
