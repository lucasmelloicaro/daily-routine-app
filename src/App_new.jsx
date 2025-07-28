import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: '⚖️ Check weight', completed: false, hasInput: true },
    { id: 2, text: '💊 Pantoprazol', completed: false },
    { id: 3, text: '☕ Black coffee', completed: false },
    { id: 4, text: '💧 500ML WATER', completed: false },
    { id: 5, text: '🍽️ LUNCH', completed: false },
    { id: 6, text: '💪 CREATINE', completed: false },
    { id: 7, text: '💧 1L water', completed: false },
    { id: 8, text: '🍎 SNACK', completed: false },
    { id: 9, text: '☕ COFFEE', completed: false },
    { id: 10, text: '🏋️ GYM', completed: false },
    { id: 11, text: '💧 500ML WATER', completed: false },
    { id: 12, text: '🍽️ DINNER', completed: false },
    { id: 13, text: '🥩 PROTEIN', completed: false },
    { id: 14, text: '📚 30Min Study', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div 
      className="w-[350px] mx-auto mt-2 p-4 bg-black rounded-2xl shadow-lg"
      style={{WebkitAppRegion: 'drag'}}
    >
      <h2 className="text-lg font-bold mb-3 text-white text-center">Daily Routine 📋</h2>
      
      {/* Weight Input */}
      <div className="mb-3 p-2 bg-gray-800 rounded-lg" style={{WebkitAppRegion: 'no-drag'}}>
        <label className="text-sm font-medium text-white">
          Weight: 
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="kg"
            className="ml-2 w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-white"
          />
        </label>
      </div>

      {/* Progress */}
      <div className="mb-3 text-center">
        <span className="text-sm font-medium text-gray-300">
          {completedCount}/{tasks.length} completed
        </span>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{width: `${(completedCount/tasks.length) * 100}%`}}
          ></div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2" style={{WebkitAppRegion: 'no-drag'}}>
        {tasks.map(task => (
          <label key={task.id} className="flex items-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-3 w-4 h-4 accent-green-500"
            />
            <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
