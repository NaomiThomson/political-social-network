module.exports = function(sequelize, DataTypes) {
   var Attendee = sequelize.define("Attendee", {
      user_id: DataTypes.BIGINT, 
      event_id: DataTypes.BIGINT
   });
   return Attendee;
}