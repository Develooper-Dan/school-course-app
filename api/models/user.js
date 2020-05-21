const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model{}

  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "Please enter your first name." },
        notEmpty: { msg: "Please enter your first name." }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "Please enter your last name." },
        notEmpty: { msg: "Please enter your last name." }
      }
    },
    emailAddress : {
      type: Sequelize.STRING,
      unique: { msg: "It seems there's already a user registered with this emailaddress" },
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter an emailaddress." },
        is: {
          args: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          msg: "The emailaddress you entered is not valid. Please check if it is spelled correctly."
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "Please enter a password." },
        notEmpty: { msg: "Please enter a password." }
      }
    }
  }, {sequelize});

  return User;
}
