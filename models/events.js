module.exports = function(sequelize, DataTypes) {
   var Event = sequelize.define("Event", {
      host: DataTypes.STRING,
      title: DataTypes.STRING,
      location: DataTypes.STRING, 
      date: DataTypes.DATE,
      description: DataTypes.TEXT
   });
   return Event;
}

