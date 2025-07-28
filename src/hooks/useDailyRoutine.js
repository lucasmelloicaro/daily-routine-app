import { useState, useEffect } from 'react';
import { saveDailyData, loadDailyData, saveWeightEntry, getWeightHistory } from '../supabase';

// Custom hook for managing daily routine data
export const useDailyRoutine = () => {
  const [weight, setWeight] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);
  const [showWeightHistory, setShowWeightHistory] = useState(false);
  const [weekendExpanded, setWeekendExpanded] = useState(false);
  const [customTasks, setCustomTasks] = useState([]);
  const [newCustomTask, setNewCustomTask] = useState('');
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
    { id: 13, text: '� Mini clean house', completed: false },
    { id: 14, text: '�🥩 PROTEIN', completed: false },
    { id: 15, text: '💊 VITAMIN', completed: false },
    { id: 16, text: '📚 30Min Study', completed: false }
  ]);
  
  const [weekendTasks, setWeekendTasks] = useState([
    { id: 17, text: '🧹 Cleaning house', completed: false },
    { id: 18, text: '🚽 Temperance poop', completed: false },
    { id: 19, text: '💧 Temperance water', completed: false },
    { id: 20, text: '👕 Clothes', completed: false },
    { id: 21, text: '🍱 Meal prep', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleWeekendTask = (id) => {
    setWeekendTasks(weekendTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleCustomTask = (id) => {
    setCustomTasks(customTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addCustomTask = () => {
    if (!newCustomTask.trim()) return;
    
    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      text: newCustomTask.trim(),
      completed: false
    };
    
    setCustomTasks([...customTasks, newTask]);
    setNewCustomTask('');
  };

  const removeCustomTask = (id) => {
    setCustomTasks(customTasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const completedCustomCount = customTasks.filter(task => task.completed).length;

  // Save weight entry
  const saveWeight = async () => {
    if (!weight || weight.trim() === '') {
      alert('Please enter a weight value');
      return;
    }
    
    try {
      await saveWeightEntry(weight);
      console.log('Weight saved successfully');
      // Refresh weight history
      loadWeightHistory();
      alert('Weight saved! 📊');
    } catch (error) {
      console.error('Error saving weight:', error);
      alert('Error saving weight. Please try again.');
    }
  };

  // Load weight history
  const loadWeightHistory = async () => {
    try {
      const history = await getWeightHistory(10); // Get last 10 entries
      setWeightHistory(history);
    } catch (error) {
      console.error('Error loading weight history:', error);
    }
  };

  // Refresh function to reload data from Supabase
  const refreshData = async () => {
    try {
      console.log('Refreshing data from Supabase...');
      const data = await loadDailyData();
      console.log('Refreshed data:', data);
      
      if (data) {
        if (data.weight) {
          setWeight(data.weight.toString());
        }
        
        // For daily tasks, always reset them (uncheck all) - they reset every day
        setTasks(tasks.map(task => ({ ...task, completed: false })));
        
        // For weekend tasks, also reset them every day
        setWeekendTasks(weekendTasks.map(task => ({ ...task, completed: false })));

        // Load custom tasks (these persist across days)
        if (data.custom_tasks && Array.isArray(data.custom_tasks)) {
          setCustomTasks(data.custom_tasks);
        }
      }
      
      // Refresh weight history too
      loadWeightHistory();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadDailyData();
        console.log('Loaded data from Supabase:', data); // Debug log
        
        if (data) {
          if (data.weight) {
            setWeight(data.weight.toString());
          }
          
          // For daily tasks, always reset them (uncheck all) - they reset every day
          // Keep the original task structure but reset completed status
          setTasks(tasks.map(task => ({ ...task, completed: false })));
          
          // For weekend tasks, also reset them every day
          setWeekendTasks(weekendTasks.map(task => ({ ...task, completed: false })));

          // Load custom tasks (these persist across days)
          if (data.custom_tasks && Array.isArray(data.custom_tasks)) {
            setCustomTasks(data.custom_tasks);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  // Load weight history on mount
  useEffect(() => {
    loadWeightHistory();
  }, []);

  // Auto-save data when state changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await saveDailyData(weight, tasks, weekendTasks, customTasks);
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };

    // Debounce saves to avoid too many requests
    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [weight, tasks, weekendTasks, customTasks]);

  return {
    weight,
    setWeight,
    weightHistory,
    showWeightHistory,
    setShowWeightHistory,
    saveWeight,
    weekendExpanded,
    setWeekendExpanded,
    tasks,
    weekendTasks,
    customTasks,
    newCustomTask,
    setNewCustomTask,
    toggleTask,
    toggleWeekendTask,
    toggleCustomTask,
    addCustomTask,
    removeCustomTask,
    completedCount,
    completedCustomCount,
    refreshData
  };
};
