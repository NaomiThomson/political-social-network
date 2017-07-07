module.exports = function(sequelize, DataTypes) {
   var Event = sequelize.define("Event", {
      creator: DataTypes.BIGINT,
      location: DataTypes.STRING, 
      date: DataTypes.DATE,
      title: DataTypes.STRING,
      description: DataTypes.TEXT
   });
   return Event;
}

