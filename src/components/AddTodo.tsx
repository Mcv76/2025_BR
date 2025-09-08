import { useState, useCallback } from 'react'

interface AddTodoProps {
  onAdd: (text: string) => void
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('')

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (trimmedText) {
      onAdd(trimmedText)
      setText('')
    }
  }, [text, onAdd])

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할일을 입력하세요"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!text.trim()}
      >
        추가
      </button>
    </form>
  )
}

export default AddTodo
