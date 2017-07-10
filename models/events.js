module.exports = function (sequelize, DataTypes) {

  function todaysDate() {
    var today = moment().format('DD-MM-YYYY');
    return today
  }

  function timeNow() {
    var now = moment().format('hh:mm:ss');
    return now
  }


  var Event = sequelize.define("Event", {
    host: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", 'i']
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: todaysDate()
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false, 
      validate: {
        isAfterTime(time) {
          if (Date.parse(time) < Date.parse(timeNow())) {
            throw new Error ('Event must be in the future!')
          }
        }
      }
    }, 
    description: DataTypes.TEXT
  });
  return Event;
}