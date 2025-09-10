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
      completed: false,
      createdAt: Date.now(),
      groupId: 'active'
    }
    setTodos(prevTodos => {
      const activeTodos = prevTodos.filter(todo => todo.groupId === 'active')
      const completedTodos = prevTodos.filter(todo => todo.groupId === 'completed')
      return [newTodo, ...activeTodos, ...completedTodos]
    })
  }

  const toggleTodo = (id: number) => {
    setTodos(prevTodos => {
      const todoIndex = prevTodos.findIndex(todo => todo.id === id)
      const todo = prevTodos[todoIndex]
      const newCompleted = !todo.completed
      
      const updatedTodo: Todo = {
        ...todo,
        completed: newCompleted,
        completedAt: newCompleted ? Date.now() : undefined,
        groupId: newCompleted ? 'completed' : 'active',
        order: undefined // 상태 변경 시 순서 초기화
      }

      const activeTodos = prevTodos.filter(t => t.groupId === 'active' && t.id !== id)
      const completedTodos = prevTodos.filter(t => t.groupId === 'completed' && t.id !== id)

      if (newCompleted) {
        // 완료 그룹으로 이동 (최하단)
        return [...activeTodos, ...completedTodos, updatedTodo]
      } else {
        // 미완료 그룹으로 이동 (최상단)
        return [updatedTodo, ...activeTodos, ...completedTodos]
      }
    })
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    setTodos(prevTodos => {
      const sourceIndex = result.source.index
      const destIndex = result.destination!.index
      const sourceItem = prevTodos[sourceIndex]
      const destItem = prevTodos[destIndex]

      // 같은 그룹 내에서만 드래그 앤 드롭 허용
      if (sourceItem.groupId !== destItem.groupId) {
        return prevTodos
      }

      const items = Array.from(prevTodos)
      const [reorderedItem] = items.splice(sourceIndex, 1)
      items.splice(destIndex, 0, reorderedItem)

      // 드래그 앤 드롭 순서 저장
      return items.map((item, index) => ({
        ...item,
        order: item.groupId === sourceItem.groupId ? index : item.order
      }))
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
