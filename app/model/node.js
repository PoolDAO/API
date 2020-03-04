const BN = require("bn.js");

module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

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
      time: BIGINT
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false
    }
  );

  const covertNode = node => {
    const statusList = app.parseJSON(node.statusTime, []);
    const depositList = app.parseJSON(node.depositList, []);
    const withdrawList = app.parseJSON(node.withdrawList, []);
    const targetDeposit = `${32 * Math.pow(10, 18)}`;
    const userDepositTotal = String(node.userDepositTotal || 0);
    const operatorDeposit = String(node.operatorDeposit || 0);
    const totalDeposit = new BN(userDepositTotal)
      .add(new BN(operatorDeposit))
      .toString();

    return {
      ...node,
      id: String(node.id),
      statusList,
      depositList,
      withdrawList,
      userDepositTotal,
      operatorDeposit,
      targetDeposit,
      totalDeposit,
      startTime: Number(
        (statusList.find(({ status }) => status === "Start") || {}).time
      )
    };
  };

  Node.findAllNodes = async function(params) {
    const options = {
      order: [["id", "DESC"]]
    };

    if (params.owner) {
      options.where.owner = params.owner;
    }

    if (params.status) {
      const lowerStatus = status.toLowerCase();

      if (["start", "raising", "preLaunch"].includes(lowerStatus)) {
        options.where.status = ["Start", "Raising", "PreLaunch"];
      } else if (["staking", "pendingSettlement"].includes(lowerStatus)) {
        options.where.status = ["Staking", "PendingSettlement"];
      } else if (["completed", "revoked"].includes(lowerStatus)) {
        options.where.status = ["Completed", "Revoked"];
      }
    }

    return this.findAll(options).map(node => covertNode(node.toJSON()));
  };

  Node.findByNodeId = async function(nodeId) {
    const options = {
      where: { id: Number(nodeId) }
    };
    const result = await this.findOne(options);
    return result && covertNode(result.toJSON());
  };

  return Node;
};
