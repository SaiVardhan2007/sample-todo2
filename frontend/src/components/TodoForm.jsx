import React, {useState} from 'react'

export default function TodoForm({onAdd}) {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(search);
    setSearch('');

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Enter Todo'
          value={search}
          />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}
