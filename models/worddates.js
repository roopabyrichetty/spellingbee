module.exports = function (sequelize, DataTypes) {
  const WordDates = sequelize.define("WordDates", {
    wordid: {
      type: DataTypes.STRING,
      allowNull: false     
    } ,
    readytoquiz:{
      type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
    }
    },{
      timestamps : true
    });

  

  return WordDates;
};