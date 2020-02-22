module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const User = app.model.define(
    "user",
    {
      user: STRING,
      nodeID: BIGINT,
      time: BIGINT
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: false,
    }
  );

  User.removeAttribute('id')

  return User;
};
