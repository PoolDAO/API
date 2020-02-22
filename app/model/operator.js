module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const Operator = app.model.define("operator", {
    id: { type: BIGINT, primaryKey: true },
    address: STRING,
    version: BIGINT,
    name: STRING,
    info: STRING,
    owner: STRING,
    totalNode: BIGINT,
    depositTotal: BIGINT,
    withdrawTotal: BIGINT,
    reputation: BIGINT,
    time: BIGINT,
    nodeIDs: STRING,
    operatorManager:STRING
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: false
  })

  return Operator;
};
  