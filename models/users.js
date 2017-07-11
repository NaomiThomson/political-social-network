module.exports = function (sequelize, DataTypes) {
   var User = sequelize.define("User", {
      email: DataTypes.STRING,
      password: DataTypes.STRING
   });

   User.associate = function (models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    User.belongsToMany(models.Event, {
      through: 'Attendees'
    });
  }
   return User;
}