module.exports = function (sequelize, DataTypes) {
  const Words = sequelize.define("Words", {
    word: {
      type: DataTypes.STRING,
      allowNull: false     
    },
    wordDefinition: {
      type: DataTypes.STRING      
    },
    wordOrigin: {
      type: DataTypes.STRING     
    },
    wordAudioLink: {
      type: DataTypes.STRING,
     },
     wordType: {
      type: DataTypes.STRING,
     },
     wordInSentence: {
      type: DataTypes.STRING,
     }
  },
  {
    timestamps : false
  });
  

  return Words;
};