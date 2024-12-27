import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Trash,Square,CheckSquare,NotePencil} from "@phosphor-icons/react"
import Todo from '../Todo'
import './index.css'

const TodoItem = () => {
    const [todoList, setTodoList] = useState([])

    useEffect(() => {    
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
          const result = await axios.get('http://localhost:8000/get-todo');
          setTodoList(result.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
    };


    const handleCheck = async (id) => {
        try{
            await axios.put('http://localhost:8000/update/'+id)
            fetchTasks();
        }catch(err){
            console.log('Error updating todo :',err)
        }
    }

    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8000/delete/'+id)
            fetchTasks();
        }catch(err){
            console.log('Error deleting todo :',err)
        }
    }

    

    

    return(
        <div className='todo-container-main'>
        <Todo/>
        <div className='main-container'>
            {
                todoList.length === 0 ? (
                    <div>
                        <h2>No TODOs</h2>
                    </div>
                ):(
                        todoList.map((item)=>(
                            <div className='todo-items-container'>
                                <div className='todo-item' >
                                    <div className='todo-item-header'>
                                        <div className='check-box' onClick={() => handleCheck(item._id)}>
                                            {item.taskDone ?
                                                (<CheckSquare size={20} />)
                                                :(<Square size={20} />)
                                            }
                                        </div>
                                        <p className={item.taskDone?'todo-task-check':'todo-task'}>{item.task}</p>
                                    </div>
                                    
                                    <p className='item-description-style'>{item.description}</p>
                                    <p>Deadline {new Date(item.date).toLocaleDateString()}</p>
                                    <p>Task {item.status}</p>
                                    <p>{item.priority} Priority Task</p>
                                    <div className='button-container'>
                                        <button className='trash-button'type='button'><NotePencil size={20} /></button>
                                        <button type="button" className='trash-button' onClick={() => handleDelete(item._id)}><Trash size={20} /></button>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    )
            }
        </div>
        </div>
    )
}

export default TodoItem