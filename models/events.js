module.exports = function (sequelize, DataTypes) {


  var Event = sequelize.define("Event", {
      host: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
        // allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          is: ["^[a-z]+$", 'i']
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    description: {
      type: DataTypes.TEXT
    }
  });
return Event;
};