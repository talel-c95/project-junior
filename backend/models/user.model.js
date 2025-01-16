module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
    
     
      },{   timestamps: true}
    );
    return User;
  };