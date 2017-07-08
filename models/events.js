module.exports = function(sequelize, DataTypes) {
   var Event = sequelize.define("Event", {
      host: DataTypes.BIGINT,
      title: DataTypes.STRING,
      location: DataTypes.STRING, 
      date: DataTypes.DATE,
      description: DataTypes.TEXT
   });
   return Event;
}

