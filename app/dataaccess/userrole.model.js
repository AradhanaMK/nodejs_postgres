module.exports = (sequelize, Sequelize) => {
    const tblUserRole = sequelize.define("idt_tblUserRole", {
      Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      RoleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  
    return tblUserRole;
  };