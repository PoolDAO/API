"use strict";

const Controller = require("egg").Controller;

class NodeController extends Controller {
  async index() {
    const { ctx } = this;
    const nodes = await this.ctx.model.Node.findAllNodes();
    ctx.body = {
      result: nodes
    };
  }

  async findByOwner() {
    const { ctx } = this;
    const nodes = await this.ctx.model.Node.findByOwner(this.ctx.params.owner);
    if (nodes === null) {
      ctx.body = {
        error: {
          code: -32001,
          message: `Can't find node of user ${this.ctx.params.user}.`
        }
      };
    } else {
      ctx.body = {
        result: nodes.map(node => ({
          ...node,
          statusTime: this.app.parseJSON(node.statusTime, []),
          depositList: this.app.parseJSON(node.depositList, []),
          withdrawList: this.app.parseJSON(node.withdrawList, [])
        }))
      };
    }
  }
}

module.exports = NodeController;
