"use client"

import useLocalStorage from '@/components/useLocalStorage';
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useLocalStorage<{ id: number, text: string, completed: boolean }[]>('todos', []);
  const [input, setInput] = useState<string>('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  function handleAddTodo() {
    const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    setTodos([...todos, { id: newId, text: input, completed: false }]);
    setInput('');
  }

  function handleToggleTodo(id: number) {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function handleDeleteTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <main>
      <div className="flex flex-col items-center min-h-screen">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="border rounded w-80 p-2 my-2"
        />
        <button className="border rounded w-40 p-2 my-2 bg-black text-white" onClick={handleAddTodo}>Add a task</button>
        
        {todos.filter(todo => !todo.completed).length > 0 && (
          <>
            <h2 className="font-bold text-2xl my-4">Yet to be completed</h2>
            <ul>
              {todos.filter(todo => !todo.completed).map((todo) => (
                <li key={todo.id} className="border rounded w-80 p-2 my-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={todo.completed} 
                      onChange={() => handleToggleTodo(todo.id)} 
                      className="mr-4"
                    />
                    <span>{todo.id}. {todo.text}</span>
                  </div>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="bg-black text-white rounded p-1 h-mc">Delete</button>
                </li>
              ))}
            </ul>
          </>
        )}

        {todos.filter(todo => todo.completed).length > 0 && (
          <>
            <h2 className="font-bold text-2xl my-4">Completed</h2>
            <ul>
              {todos.filter(todo => todo.completed).map((todo) => (
                <li key={todo.id} className="border rounded w-80 p-2 my-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={todo.completed} 
                      onChange={() => handleToggleTodo(todo.id)} 
                      className="mr-4"
                    />
                    <span>{todo.id}. {todo.text}</span>
                  </div>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="bg-black text-white rounded p-1">Delete</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  )
}
