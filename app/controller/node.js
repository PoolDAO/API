"use strict";

const Controller = require("egg").Controller;

class NodeController extends Controller {
  async index() {
    const { ctx } = this;
    const nodes = await this.ctx.model.Node.findAllNodes(this.ctx.query);
    ctx.body = {
      result: nodes
    };
  }

  async findByNodeId() {
    const { ctx } = this;
    const node = await this.ctx.model.Node.findByNodeId(
      this.ctx.params.nodeId
    );
    if (node === null) {
      ctx.body = {
        error: {
          code: -32001,
          message: `Can't find node of user ${this.ctx.params.nodeId}.`
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
