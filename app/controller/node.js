"use strict";

const Controller = require("egg").Controller;

class NodeController extends Controller {
  async index() {
    const { ctx } = this;
    const node = await this.ctx.model.Node.findAll({ order: [['id', 'DESC']] });
    ctx.body = {
      nodes: node
    };
  }
}

module.exports = NodeController;
