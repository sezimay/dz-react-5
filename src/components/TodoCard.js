import Button from "./UI/Button"


const TodoCard = ({ todo, deleteTodo, openWindowToEdit }) => {

  return (
    <div className="todoCard">
      <h4 onClick={() => openWindowToEdit(todo)}>{todo.title}</h4>
      <h4>{todo.id.length > 50 ? todo.id.substr(0, 50) + '...' : todo.id}</h4>
      <Button handleDo={() => deleteTodo(todo)}>Delete</Button>
    </div>
  )
}

export default TodoCard