module.exports = (sequelize, DataTypes) => {
    const TravelStory = sequelize.define(
      "TravelStory",
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        story: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // visitedLocation: {
        //   type: DataTypes.JSON,
        //   defaultValue: [],
        // },
        // isFavourite: {
        //   type: DataTypes.BOOLEAN,
        //   defaultValue: false,
        // },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        // createdOn: {
        //   type: DataTypes.DATE,
        //   defaultValue: DataTypes.NOW,
        // },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        visitedDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      { 
        timestamps: true, 
          }
    );
  
    return TravelStory;
  };
  