const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const TodoModel = require('./model/Todo')




const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/mine");

app.post('/add',async (req,res)=>{
    const {task} = req.body;

    try {
        const data = await TodoModel.create({
            task:task
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