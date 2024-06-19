import React,{useState} from 'react'
import axios from 'axios'
import './index.css'


const Todo = () => {

    const [todoInput,setTodoInput] = useState('')
    
    const onSubmitTodo=()=>{
        axios.post('http://localhost:8000/add',{task:todoInput})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const onChangeTodoInput = (event) => {
        setTodoInput(event.target.value)
    }
    

        return(
            <>
                <form onSubmit={onSubmitTodo} className="todo-form">
                    <div className='logo-container'>
                        <img
                            src="https://res.cloudinary.com/dzbev5zdy/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1718730037/shanture_logo_wfecdv.jpg"
                            alt="Shanture-logo"
                            className="logo"
                        />
                        <h1>T O D O</h1>
                    </div>
                    <div className="sub-todo">
                        <input
                        type="text"
                        className='todo-input'
                        placeholder='Write Todo'
                        onChange={onChangeTodoInput}
                        value={todoInput}
                        />
                        <button type='submit' className="todo-button">Add Todo</button> 
                    </div>
                </form>
            </>
        )
    
}

export default Todo