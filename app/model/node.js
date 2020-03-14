const BN = require("bn.js");

module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;
  const Op = app.Sequelize.Op;

  const Node = app.model.define(
    "node",
    {
      id: { type: BIGINT, primaryKey: true },
      address: STRING,
      version: BIGINT,
      name: STRING,
      info: STRING,
      owner: STRING,
      nodeManager: STRING,
      partner: STRING,
      dao: STRING,
      feePercentage: BIGINT,
      daoFeePercentage: BIGINT,
      partnerFeePercentage: BIGINT,
      pk: STRING,
      validatorSignature: STRING,
      withdrawalCredentials: STRING,
      depositData: STRING,
      statusTime: STRING,
      duration: BIGINT,
      balance: BIGINT,
      operator: STRING,
      operatorDeposit: BIGINT,
      userDepositTotal: BIGINT,
      minShardingDeposit: BIGINT,
      depositCapacity: BIGINT,
      status: STRING,
      depositList: STRING,
      withdrawList: STRING,
      reward: BIGINT,
      ownerFee: BIGINT,
      daoFee: BIGINT,
      partnerFee: BIGINT,
      time: BIGINT,
      rate: BIGINT
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false
    }
  );

  const covertNode = node => {
    if (node.address) {
      node.address = node.address.toLowerCase();
    }
    if (node.owner) {
      node.owner = node.owner.toLowerCase();
    }
    if (node.nodeManager) {
      node.nodeManager = node.nodeManager.toLowerCase();
    }
    if (node.operator) {
      node.operator = node.operator.toLowerCase();
    }
    if (node.partner) {
      node.partner = node.partner.toLowerCase();
    }
    if (node.dao) {
      node.dao = node.dao.toLowerCase();
    }
    if (node.pk) {
      node.pk = node.pk.toLowerCase();
    }
    if (node.validatorSignature) {
      node.validatorSignature = node.validatorSignature.toLowerCase();
    }
    if (node.withdrawalCredentials) {
      node.withdrawalCredentials = node.withdrawalCredentials.toLowerCase();
    }
    if (node.depositData) {
      node.depositData = node.depositData.toLowerCase();
    }
    if (node.validatorSignature) {
      node.validatorSignature = node.validatorSignature.toLowerCase();
    }
    if (node.validatorSignature) {
      node.validatorSignature = node.validatorSignature.toLowerCase();
    }
    const statusTime = app.parseJSON(node.statusTime, []).map(result => {
      result.time = Number(result.time);
      return result;
    });
    const depositList = app.parseJSON(node.depositList, []).map(result => {
      result.time = Number(result.time);
      result.addr = result.addr && result.addr.toLowerCase();
      return result;
    });
    const withdrawList = app.parseJSON(node.withdrawList, []).map(result => {
      result.time = Number(result.time);
      result.addr = result.addr && result.addr.toLowerCase();
      return result;
    });

    return {
      ...node,
      id: String(node.id),
      statusTime,
      depositList,
      withdrawList,
      userDepositTotal: String(node.userDepositTotal || 0),
      operatorDeposit: String(node.operatorDeposit || 0),
      depositCapacity: String(node.depositCapacity || 0),
      minShardingDeposit: String(node.minShardingDeposit || 0),
      reward: String(node.reward || 0),
      ownerFee: String(node.ownerFee || 0),
      daoFee: String(node.daoFee || 0),
      partnerFee: String(node.partnerFee || 0),
      balance: String(node.balance || 0),
      startTime: Number(
        (statusTime.find(({ status }) => status === "Start") || {}).time
      ),
      statusText: ["Start", "Raising"].includes(node.status)
        ? "募集中"
        : ["PreLaunch"].includes(node.status)
        ? "待启动"
        : ["Staking", "PendingSettlement"].includes(node.status)
        ? "运行中"
        : ["Completed", "Revoked"].includes(node.status)
        ? "已清算"
        : null
    };
  };

  Node.findAllNodes = async function(params) {
    const options = {
      order: [["id", "DESC"]],
      where: {
        pk: {
          [Op.ne]: null
        }
      }
    };

    if (params.owner) {
      options.where.owner = params.owner;
    }

    if (params.status) {
      const lowerStatus = status.toLowerCase();

      if (["start", "raising", "prelaunch"].includes(lowerStatus)) {
        options.where.status = ["Start", "Raising", "PreLaunch"];
      } else if (["staking", "pendingsettlement"].includes(lowerStatus)) {
        options.where.status = ["Staking", "PendingSettlement"];
      } else if (["completed", "revoked"].includes(lowerStatus)) {
        options.where.status = ["Completed", "Revoked"];
      }
    }

    return this.findAll(options).map(node => covertNode(node.toJSON()));
  };

  Node.findByNodeId = async function(nodeId) {
    const options = {
      order: [["id", "DESC"]],
      where: {
        id: Number(nodeId),
        pk: {
          [Op.ne]: null
        }
      }
    };
    const result = await this.findOne(options);
    return result && covertNode(result.toJSON());
  };

  Node.findByIds = async function(ids = []) {
    const options = {
      order: [["id", "DESC"]],
      where: {
        id: ids.map(id => Number(id))
      }
    };

    return this.findAll(options).map(node => covertNode(node.toJSON()));
  };

  return Node;
};
