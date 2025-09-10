import { Todo } from '../types'
import { memo } from 'react'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item d-flex align-items-center p-3 border rounded bg-white ${todo.completed ? 'completed' : ''} hover:bg-gray-50 transition-colors duration-200`}>
      <div className="form-check flex-grow-1 cursor-pointer">
        <input
          type="checkbox"
          className="form-check-input"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label
          className={`form-check-label ms-2 ${todo.completed ? 'text-decoration-line-through' : ''}`}
        >
          {todo.text}
        </label>
      </div>
      <button
        className="btn btn-danger btn-sm"
        style={{ minWidth: '60px' }}
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
      <div className="ms-2 text-gray-400">
        <i className="fas fa-grip-vertical"></i>
      </div>
    </div>
  )
}

export default memo(TodoItem)