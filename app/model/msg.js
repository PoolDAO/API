module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const Msg = app.model.define("msg", {
    id: { type: BIGINT, primaryKey: true },
    user: STRING,
    msg: STRING,
    txid: STRING,
    relatedId: BIGINT,
    value: BIGINT,
    time: BIGINT
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: false
  })

  return Msg;
};
  