const { Travel } = require("../models/index"); // Ensure correct import
const { User } = require("../models/user.model");
const path = require("path");
const { Op } = require("sequelize");
const fs = require("fs");
const { start } = require("repl");
const travelStoryModel = require("../models/travelStory.model");
const { error } = require("console");

module.exports = {
  addTravelStory: async (req, res) => {
    const { title, story, imageUrl, visitedDate } = req.body;
    const { userId } = req.user

    if (!title || !story  || !imageUrl || !visitedDate) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
      const travelStory = await Travel.create({
        title,
        story,
        imageUrl,
        visitedDate: parsedVisitedDate,
        userId, 
      });

      res.status(201).json({ story: travelStory, message: "Added successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: true, message: error.message });
    }
  },
  getAll: async (req, res) => {
    const { userId } = req.user;
  
    try {
      const travelStories = await Travel.findAll({
        where: { userId },
      });
  
      res.status(200).json({ stories: travelStories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: error.message });
    }
  },
  imageUpload:async (req,res)=>{
    try{
      if(!req.file){
        return res
        .status(400)
        .json({error:true,message:'no image uploaded'})
      }
      const imageUrl=`https://localhost:8000/uploads/${req.file.filename}`
    
    res.status(201).json({ imageUrl })
    
    }catch (error){
      res.status(500).json({error:true,message:error.message})
    }
  },
  deleteImage: async (req, res) => {
    const { imageUrl } = req.query;
    
    if (!imageUrl) {
      return res.status(400).json({ error: true, message: 'imageUrl parameter is required' });
    }

    try {
      
      const filename = imageUrl.split('/').pop();
      const filePath = path.join(__dirname, '..', 'uploads', filename)

      if (fs.existsSync(filePath)) {
       
        fs.unlinkSync(filePath);
      } else {
        return res.status(404).json({ error: true, message: 'Image file not found' });
      }

      const travelStory = await Travel.findOne({ where: { imageUrl } });

      if (!travelStory) {
        return res.status(404).json({ error: true, message: 'Image not associated with any travel story' });
      }

      await travelStory.update({ imageUrl: null })

      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: error.message });
    }
  },
  updateIsFavourite: async (req, res) => {
    const { travelStoryId, isFavourite } = req.body;

    if (typeof isFavourite !== 'boolean' || !travelStoryId) {
      return res.status(400).json({ error: true, message: 'Invalid input, travelStoryId and isFavourite are required.' });
    }

    try {
      const travelStory = await Travel.findByPk(travelStoryId);

      if (!travelStory) {
        return res.status(404).json({ error: true, message: 'Travel story not found' });
      }

      await travelStory.update({ isFavourite });

      res.status(200).json({ message: 'Travel story updated successfully', travelStory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: error.message });
    }
  },
  searchStories: async (req, res) => {
    const { query } = req.query; 
  
    if (!query) {
      return res.status(400).json({ error: true, message: 'Query parameter is required' });
    }
  
    try {
      const travelStories = await Travel.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { story: { [Op.like]: `%${query}%` } },
          ]
        }
      });
  
      if (travelStories.length === 0) {
        return res.status(404).json({ error: true, message: 'No stories found matching the search query' });
      }
  
      res.status(200).json({ stories: travelStories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: error.message });
    }
  },
  filter: async (req, res) => {
    const { startDate, endDate } = req.query;
    const { userId } = req.user;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ error: true, message: 'StartDate and EndDate are required.' });
    }
  
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const filterStories = await Travel.findAll({
        where: {
          userId: userId,
          visitedDate: {
            [Op.between] : [start, end],
          },
        },
        order: [["isFavourite", "DESC"]], 
      });
  
      res.status(200).json({ stories: filterStories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: error.message });
    }
  },
  editStory:async (req,res) => {
    const {id}=req.params
    const {title,story,imageUrl,visitedDate}=req.body
    const {userId}=req.user
    if (!title || !story  || !imageUrl || !visitedDate){
      return res.status(400).json({ error: true, message: "All fields are required" });
    }
    const parsedVisitedDate=new Date(parseInt(visitedDate))
  try{
    const travelStory=await Travel.findOne({
      id:id,
      userId:userId
    })
    if(!travelStory){
      return res
      .status(404)
      .json({error:true,message:"travel story not found"})
    }
    const placeholderImgUrl=`https://localhost:8000/assests/placeholder.png`

    travelStory.title=title
    travelStory.story=story
    travelStory.imageUrl=imageUrl || placeholderImgUrl
    travelStory.visitedDate=parsedVisitedDate


    await travelStory.save()
    res.status(200).json({story:travelStory,message:"update successfuly"})

  }catch(error){
    res.status(500).json({error:true,message:error.message})
  }
},
  deleteCard:async (req,res) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(401).send({ message: "id is not send" });
      }
      await Travel.destroy({where:{id:id}});
      res.send({ message: "card is deleted successfully" });
    } catch (error) {
      throw error;
    }
 }
  
};
