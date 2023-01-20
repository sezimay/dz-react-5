import { useState } from 'react';
import ModalWindow from '../components/ModalWindow';
import TodoCard from '../components/TodoCard';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const TodoPage = () => {
  const [ todoList, setTodoList ] = useState([]) 
  const [ value, setValue ] = useState('')
  const [ isShow, setIsShow ] = useState(false)

  const [ dataTask, setDataTask ] = useState({
    title: '',
    description: '',
  })
  
  const handleOnChange = (e) => {
    setDataTask(prev => {
      return {...prev, [ e.target.name ]: e.target.value}
    })
  }

  const addTodo = (todo) => {
    const foundTask = todoList.find((item) => item.title === todo.title)

    if (foundTask?.title) {
      alert('Задача с таким полем уже есть!')
      return
    }

    setTodoList(prev => [...prev, { id: Date(), title: todo.title, description: todo.description }])
  }

  const editTodo = (todo) => {
    const newTasks = todoList.map((item) => {
      if (item.id === todo.id) {
        return todo
      } else {
        return item
      }
    })

    setTodoList(newTasks)
  }

  const deleteTodo = (todo) => {
    const newState = todoList.filter(item => item.id !== todo.id)
    setTodoList(newState)
  }

  const openWindowToEdit = (todo) => {
    console.log(todo)
    setDataTask(todo)
    setIsShow(true)
  }

  return (
    <>
      {isShow && (
          <ModalWindow editTodo={editTodo} dataTask={dataTask} handleOnChange={handleOnChange} addTodo={addTodo} closeWindow={() => setIsShow(prev => !prev)}/>
      )}
      <div className='flexWrapper'>
      <Input className='inputSearch' title={value} setValue={setValue}/>
      <Button handleDo={() => setIsShow(prev => !prev)}>
        Добавить таск
      </Button>
      <div className='listItems'>
      {todoList.map((item, i) =>
          <TodoCard key={i} openWindowToEdit={openWindowToEdit} todo={item} deleteTodo={deleteTodo}/>
      )}
      </div>
    </div>
    </>
  )
} 

export default TodoPage;