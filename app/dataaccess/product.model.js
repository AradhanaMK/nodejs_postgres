module.exports = (sequelize, Sequelize) => {
  const tblProduct = sequelize.define("idt_tblProduct", {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    productCode: {
      type: Sequelize.INTEGER
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return tblProduct;
};
