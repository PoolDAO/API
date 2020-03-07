"use strict";

const Controller = require("egg").Controller;

class OperatorController extends Controller {
  async findOperators() {
    const { ctx } = this;
    const operators = await ctx.model.Operator.findOperators();

    ctx.body = {
      result: operators
    };
  }

  async findOperatorDetail() {
    const { ctx } = this;
    const operator = await ctx.model.Operator.findOperatorDetail(
      ctx.params.operatorId
    );

    ctx.body = {
      result: operator
    };
  }
}

module.exports = OperatorController;
