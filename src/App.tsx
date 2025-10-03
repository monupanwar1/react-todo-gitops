import { useState, useEffect } from 'react';

type Todo = {
  text: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? (JSON.parse(saved) as Todo[]) : [];
  });

  const [input, setInput] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', alignItems:'center',justifyContent:'center',display:'flex', flexDirection:"column", fontFamily: 'sans-serif' }}>
      <h1>React Todo ✅</h1>
      <input
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t, i) => (
          <li
            key={i}
            style={{ textDecoration: t.done ? 'line-through' : 'none' }}
          >
            <span onClick={() => toggleTodo(i)}>{t.text}</span>
            <button onClick={() => removeTodo(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
