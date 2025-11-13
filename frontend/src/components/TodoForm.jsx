import React, {useState} from 'react'

export default function TodoForm({onAdd}) {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Todo'
          value={title}
          required
          />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}
