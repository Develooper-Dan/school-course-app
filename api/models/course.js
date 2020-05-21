const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model{}

  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "Please enter a course title." },
        notEmpty: { msg: "Please enter a course title." },
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate:{
        notNull: { msg: "Please enter a description." },
        notEmpty: { msg: "Please enter a description." },
      }
    },
    estimatedTime: {
      type: Sequelize.STRING
    },
    materialsNeeded: {
      type: Sequelize.STRING
    }
  }, {sequelize});

  return Course;
}
