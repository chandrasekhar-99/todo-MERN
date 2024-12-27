const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const TodoModel = require('./model/Todo')




const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://chanduMongoDB:Mongo%40253@cluster0.phxtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.post('/add',async (req,res)=>{
    const {task,description,date,status,priority} = req.body;

    try {
        const data = await TodoModel.create({
            task:task,
            description:description,
            date:date,
            status:status,
            priority:priority
        });

        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

app.get('/get-todo', async (req,res)=>{
    try {
        const data = await TodoModel.find();

        
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

app.put('/update/:id', async (req,res)=>{
    
    try {
       const {id} = req.params;
       const data = await TodoModel.findByIdAndUpdate({_id: id}, {taskDone: true});
        
        
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

app.delete('/delete/:id', async (req,res)=>{
    
  try {
     const {id} = req.params;
     const data = await TodoModel.findByIdAndDelete({_id: id});
      
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})



app.listen(8000,()=>{
    console.log('server is running on 8000')
})