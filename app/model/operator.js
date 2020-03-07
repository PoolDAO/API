module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const Operator = app.model.define(
    "operator",
    {
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
      operatorManager: STRING
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false
    }
  );

  const covertOperator = operator => {
    if (operator.nodeIDs) {
      operator.nodeIDs = app.parseJSON(operator.nodeIDs, []);
    }
    if (operator.address) {
      operator.address = operator.address.toLowerCase();
    }
    if (operator.owner) {
      operator.owner = operator.owner.toLowerCase();
    }
    if (operator.operatorManager) {
      operator.operatorManager = operator.operatorManager.toLowerCase();
    }
    if (operator.depositTotal !== undefined) {
      operator.depositTotal = String(operator.depositTotal || 0);
    }
    if (operator.withdrawTotal !== undefined) {
      operator.withdrawTotal = String(operator.withdrawTotal || 0);
    }
    if (operator.depositTotal !== undefined) {
      operator.depositTotal = String(operator.depositTotal || 0);
    }

    return operator;
  };

  Operator.findOperators = async function() {
    const options = {
      attributes: ["id", "info", "address", "reputation", "nodeIDs"]
    };

    const result = await this.findAll(options);

    return result.map(covertOperator);
  };

  Operator.findOperatorDetail = async function(id) {
    const options = {
      where: {
        id: id
      }
    };

    const result = await this.findOne(options);
    return covertOperator(result);
  };

  return Operator;
};
