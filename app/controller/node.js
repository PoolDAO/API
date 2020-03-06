"use strict";

const Controller = require("egg").Controller;

class NodeController extends Controller {
  async index() {
    const { ctx } = this;
    const nodes = await ctx.model.Node.findAllNodes(this.ctx.query);
    ctx.body = {
      result: nodes
    };
  }

  async findByNodeId() {
    const { ctx } = this;
    const node = await ctx.model.Node.findByNodeId(
      ctx.params.nodeId
    );
    if (node === null) {
      ctx.body = {
        error: {
          code: -32001,
          message: `Can't find node of user ${ctx.params.nodeId}.`
        }
      };
    } else {
      ctx.body = {
        result: node
      };
    }
  }
}

module.exports = NodeController;
