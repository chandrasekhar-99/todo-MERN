import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Trash,Square,CheckSquare} from "@phosphor-icons/react"
import Todo from '../Todo'
import './index.css'

const TodoItem = () => {
    const [todoList, setTodoList] = useState([])

    useEffect(() => {    
        axios.get('http://localhost:8000/get-todo')
        .then(result => setTodoList(result.data))
        .catch(err => console.log(err))
    }, []);

    const handleCheck = (id) => {
        axios.put('http://localhost:8000/update/'+id)
        .then(result => {
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/delete/'+id)
        .then(result => {
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
    

    return(
        <div className='main-container'>
            <Todo/>
            <br/>
            {
                todoList.length === 0 ? (
                    <div>
                        <h2>No TODOs</h2>
                    </div>
                ):(
                        todoList.map((item)=>(
                            <div className='todo-items-container'>
                                <div className='todo-item' >
                                    <div className='check-box' onClick={() => handleCheck(item._id)}>
                                        {item.taskDone ?
                                            (<CheckSquare size={20} />)
                                            :(<Square size={20} />)
                                        }
                                        <p className={item.taskDone?'todo-task-check':'todo-task'}>{item.task}</p>
                                    </div>
                                    <button type="button" className='trash-button' onClick={() => handleDelete(item._id)}><Trash size={20} /></button>
                                </div>
                                
                            </div>
                        ))
                    )
            }
        </div>
    )
}

export default TodoItem