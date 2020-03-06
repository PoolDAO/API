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
      underscored: false
    }
  );

  User.removeAttribute("id");

  User.findByUser = async function(user) {
    const options = {
      where: {
        user: user
      }
    };
    const result = await this.findAll(options);
    return (
      result &&
      result.map(({ user, nodeID, time }) => {
        return {
          nodeId: String(nodeID),
          time
        };
      })
    );
  };

  return User;
};
