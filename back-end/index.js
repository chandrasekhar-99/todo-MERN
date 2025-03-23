const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const TodoModel = require('./model/Todo')
const dotenv = require('dotenv')




const app = express()
dotenv.config();
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)


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
        console.log(data)
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



app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})