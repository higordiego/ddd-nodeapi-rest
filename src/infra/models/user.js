
module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    name: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    verifiedAt: {
      allowNull: true,
      type: DataType.DATE
    },
  })

  // User.associate = (models) => {
  // }

  return User
}
