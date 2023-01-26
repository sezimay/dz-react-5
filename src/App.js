import { createContext, useState } from 'react';
import './App.css';
import TodoPage from './page/TodoPage';

export const Context = createContext(null)

function App() {

  const [search, setSearch] = useState('')

  return (
    <Context.Provider value={{ search, setSearch }}>
    <div className='App'>
      <div className='container'>
        <TodoPage/>
      </div>
    </div>
    </Context.Provider>
  )
}

export default App; 