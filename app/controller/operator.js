"use strict";

const Controller = require("egg").Controller;

class OperatorController extends Controller {
  async index() {
    const { ctx } = this;
    const operator = await this.ctx.model.Operator.findAll({ order: [['id', 'DESC']] });
    ctx.body = {
      operators: operator
    };
  }
}

module.exports = OperatorController;
