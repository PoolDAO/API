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
    const node = await ctx.model.Node.findByNodeId(ctx.params.nodeId);
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

  async findByOwner() {
    const { ctx } = this;
    const userDeposit = await ctx.model.User.findByUser(ctx.params.owner);
    const ids = userDeposit.map(({ nodeId }) => Number(nodeId));

    const nodeList = await ctx.model.Node.findByIds(ids);
    if (nodeList === null) {
      ctx.body = {
        error: {
          code: -32001,
          message: `Can't find node of user ${ctx.params.owner}.`
        }
      };
    } else {
      ctx.body = {
        result: nodeList
      };
    }
  }
}

module.exports = NodeController;
