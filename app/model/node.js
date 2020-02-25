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
    return {
      ...node,
      statusTime: app.parseJSON(node.statusTime, []),
      depositList: app.parseJSON(node.depositList, []),
      withdrawList: app.parseJSON(node.withdrawList, [])
    };
  };

  Node.findAllNodes = async function() {
    return (
      await this.findAll({
        order: [["id", "DESC"]]
      })
    ).map(node => covertNode(node.toJSON()));
  };

  Node.findByOwner = async function(owner) {
    return this.findAll({
      where: { owner },
      order: [["id", "DESC"]]
    }).map(node => covertNode(node.toJSON()));
  };

  return Node;
};
