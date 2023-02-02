import { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import ModalWindow from '../components/ModalWindow';
import TodoCard from '../components/TodoCard';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const TodoPage = () => {
  const [ todoList, setTodoList ] = useState(null) 
  const [ isShow, setIsShow ] = useState(false)

  const { search, setSearch } = useContext(Context)
  const [ sortBy, setSortBy ] = useState('abs') // abs || desc || letter

  const [ dataTask, setDataTask ] = useState({
    title: '',
    description: '',
  })
  
  const closeWindow = () => {
    setIsShow(prev => !prev)
    setDataTask({
      title: '',
      description: '',
    })
  }
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

    const date = Date.now()

    console.log(date)

    setTodoList(prev => [...prev, { id: Date.now(), title: todo.title, description: todo.description,completed:false }])
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
    setDataTask(todo)
    setIsShow(true)
  }

  useEffect(() => {
    const data = localStorage.getItem('data')
    setTodoList(JSON.parse(data) || [])
  }, [])

  useEffect(() => {
    if (todoList === null) {
      return
    }
    localStorage.setItem('data', JSON.stringify(todoList))
  }, [ todoList ])

  const SearchFunc = () => todoList?.filter((item) => item.title.includes(search))

  const SortAndFilter = (arr) => {

    switch (sortBy) {
      case 'abs': {
        return arr?.sort((a, b) => a.id - b.id)
      }
      case 'desc': {
        return arr?.sort((a, b) => b.id - a .id)
      }
      case 'letter': {
        return arr?.sort((a, b) => b.title - a .tite)
      }
      default: {
        return arr
      }
    } 
  }

  console.log(sortBy)
  const ClearTodo  = ()=>{
    console.log(todoList);
    const newTodo = todoList.filter((a)=>{
    if(a.completed == true){
    
    }
    else{
     return a 
    }
    })
    setTodoList(newTodo)
    
    }
  return (
    <>
      {isShow && (
          <ModalWindow editTodo={editTodo} dataTask={dataTask} handleOnChange={handleOnChange} addTodo={addTodo} closeWindow={closeWindow}/>
      )}
      <div className='flexWrapper'>
      <button type="reset" className='buttonAdd' onClick={ClearTodo}></button>
      <Button handleDo={() => setSortBy('asc')}>По возрастанию</Button>
      <Button handleDo={() => setSortBy('desc')}>По убыванию</Button>
      <Button handleDo={() => setSortBy('letter')}>По алфавиту</Button>

      <Input className='inputSearch' value={search} handleOnChange={(e) => setSearch(e.target.value)}/>
      <Button handleDo={() => setIsShow(prev => !prev)}>
        Добавить таск
      </Button>
      <div className='listItems'>
      {SortAndFilter(SearchFunc())?.map((item, i) =>
          <TodoCard key={i} openWindowToEdit={openWindowToEdit} todo={item} deleteTodo={deleteTodo}/>
      )}
      </div>
    </div>
    </>
  )
} 

export default TodoPage;  