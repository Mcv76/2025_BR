import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Todo } from '../types'
import TodoItem from './TodoItem'
import { memo } from 'react'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 my-4">
        할일이 없습니다. 새로운 할일을 추가해보세요!
      </div>
    )
  }

  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="mt-4"
        >
          {todos.map((todo, index) => (
            <Draggable
              key={todo.id}
              draggableId={todo.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`mb-2 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                >
                  <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default memo(TodoList)