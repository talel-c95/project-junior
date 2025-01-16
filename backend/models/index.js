const { Sequelize, DataTypes } = require("sequelize");
// Create Sequelize connection
const sequelize = new Sequelize("project", "root", "0000", {
  host: "localhost",
  dialect: "mysql",
});



const db={}
db.sequelize =sequelize;


db.Travel=require('./travelStory.model')(sequelize,DataTypes)
db.User=require('./user.model')(sequelize,DataTypes)




db.User.hasMany(db.Travel, {
    foreignKey: 'userId',
    as: 'Travel'
  });
  
db.Travel.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user'
  });



  db.sequelize.sync()
// db.sequelize.sync({force :true})
module.exports=db