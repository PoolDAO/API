module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const Overview = app.model.define("overview", {
    user: STRING,
    participate: BIGINT,
    run: BIGINT,
    end: BIGINT,
    pending: BIGINT,
    deposit: BIGINT,
    profit: BIGINT,
    rate: BIGINT,
    time: BIGINT
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: false,
  })

  Overview.removeAttribute('id')

  return Overview;
};
  