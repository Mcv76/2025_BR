import { useState, useEffect, useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { Todo } from './types'

// localStorage에서 todos 가져오기
const loadTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    try {
      return JSON.parse(savedTodos)
    } catch {
      return []
    }
  }
  return []
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos())

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    setTodos(prevTodos => {
      const items = Array.from(prevTodos)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination!.index, 0, reorderedItem)
      return items
    })
  }, [])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container py-5">
        <h1 className="text-4xl font-bold text-center mb-8">할일 관리</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <AddTodo onAdd={addTodo} />
                <TodoList
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

export default App
