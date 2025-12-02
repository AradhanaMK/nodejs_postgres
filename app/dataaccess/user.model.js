module.exports = (sequelize, Sequelize) => {
  const tblUser = sequelize.define("idt_tblUser", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return tblUser;
};
