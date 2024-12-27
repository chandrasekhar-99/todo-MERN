import React,{useState} from 'react'
import axios from 'axios'
import './index.css'


const Todo = () => {

    const [todoInput,setTodoInput] = useState('')
    const [todoDescription,setTodoDescription] = useState('')
    const [todoDate,setTodoDate] = useState('')
    const [selectedStatus, setSelectedStatus] = useState("Pending"); 
    const [selectedPriority, setSelectedPriority] = useState('');        
    
    const onSubmitTodo=(event)=>{
        event.preventDefault()
        axios.post('http://localhost:8000/add',{
            task:todoInput,
            description:todoDescription,
            date:todoDate,
            status:selectedStatus,
            priority:selectedPriority
        })

        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const onChangeTodoInput = (event) => {
        setTodoInput(event.target.value)
    }
    
    const onChangeTodoDescription = (event) => {
        setTodoDescription(event.target.value)
    }

    const onChangeDate = (event) => {
        setTodoDate(event.target.value)
    }

    const handleChangeStatus = (event) => {
        setSelectedStatus(event.target.value);
    }

    const handleChangePriority = (event) => {
        setSelectedPriority(event.target.value);
    }

    

    const renderTaskStatus = () => {
        return(
            <div className='task-status-container'>
            <h3 className='task-status-heading'>task status:</h3>
            <div className='radio-input'>
                
                <label>
                    <input
                    type="radio"
                    value="Pending"
                    checked={selectedStatus === "Pending"}
                    onChange={handleChangeStatus}
                    />
                    Pending
                </label>
                <br />
                <label>
                    <input
                    type="radio"
                    value="In Progress"
                    checked={selectedStatus === "In Progress"}
                    onChange={handleChangeStatus}
                    />
                    In Progress
                </label>
                <br />
                <label>
                    <input
                    type="radio"
                    value="Completed"
                    checked={selectedStatus === "Completed"}
                    onChange={handleChangeStatus}
                    />
                    Completed
                </label>
                </div>
                </div>
            );
    }

    const renderTaskPriority = () => {
        return(
            <div className='task-priority-container'>
                <select value={selectedPriority} onChange={handleChangePriority} className='priority-select'>
                    <option value="" disabled>
                    Select an Task Priority
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        )
    }



        return(
            <>
                <form onSubmit={onSubmitTodo} className="todo-form">
                    <div className='logo-container'>
                        <h1>T O D O</h1>
                    </div>
                    

                        <div className='task-input-container-1'>

                            <div className='task-input-sub-container-1'>
                                <input
                                type="text"
                                className='todo-input'
                                placeholder='Task Name'
                                onChange={onChangeTodoInput}
                                value={todoInput}
                                />

                                <textarea className='todo-description-input' rows="5" cols="45" placeholder='Task Description...' onChange={onChangeTodoDescription} value={todoDescription}>
                                </textarea>

                                <button type='submit' className="todo-button">Add Task</button> 
                            </div>
                            
                            <div className='task-input-sub-container-2'>
                                <div>{renderTaskStatus()}</div>
                                <div>{renderTaskPriority()}</div>
                                <h3 className='task-date-heading'>Task Deadline :</h3>
                                <input className='date-input'  type="date" onChange={onChangeDate} value={todoDate}/>
                            </div>
                            
                        </div>

                        
                        
                        
                    
                </form>
            </>
        )
    
}

export default Todo