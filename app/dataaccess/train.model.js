module.exports = (sequelize, Sequelize) => {
  const tblTrain = sequelize.define("idt_tblTrain", {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    trainName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    trainNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    source: {   
        type: Sequelize.STRING,
        allowNull: false,
    },
    destination: {  
        type: Sequelize.STRING,
        allowNull: false,
    },
    departureTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    arrivalTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
  });
    return tblTrain;
};