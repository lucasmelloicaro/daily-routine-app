import { createClient } from '@supabase/supabase-js'

// Supabase project credentials
const supabaseUrl = 'https://hykyjzcwolkpsxkwinlt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5a3lqemN3b2xrcHN4a3dpbmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MjY0NzMsImV4cCI6MjA2OTMwMjQ3M30.LPQN9hkv6lGMIXeZ_H7XaprsNMuiYnByBdNmo--Hppo'

// Now we'll use Supabase instead of localStorage
const useLocalStorage = false;

export const supabase = useLocalStorage ? null : createClient(supabaseUrl, supabaseKey)

// Database functions with localStorage fallback
export const saveDailyData = async (weight, tasks, weekendTasks, customTasks = []) => {
  if (useLocalStorage) {
    // Use localStorage as fallback
    const data = {
      date: new Date().toISOString().split('T')[0],
      weight,
      tasks,
      weekend_tasks: weekendTasks,
      custom_tasks: customTasks,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem('dailyRoutineData', JSON.stringify(data));
    return data;
  }
  
  try {
    const { data, error } = await supabase
      .from('daily_routine')
      .upsert({
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        weight: weight,
        tasks: tasks,
        weekend_tasks: weekendTasks,
        custom_tasks: customTasks,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'date'
      })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving data:', error)
    throw error
  }
}

export const loadDailyData = async () => {
  if (useLocalStorage) {
    // Use localStorage as fallback
    const stored = localStorage.getItem('dailyRoutineData');
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toISOString().split('T')[0];
      if (data.date === today) {
        return data;
      }
    }
    return null;
  }
  
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('daily_routine')
      .select('*')
      .eq('date', today)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
    return data
  } catch (error) {
    console.error('Error loading data:', error)
    return null
  }
}

// Weight history functions
export const saveWeightEntry = async (weight) => {
  if (useLocalStorage) {
    // Use localStorage as fallback
    const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
    const today = new Date().toISOString().split('T')[0];
    
    // Remove existing entry for today if it exists
    const filteredHistory = weightHistory.filter(entry => entry.date !== today);
    
    // Add new entry
    filteredHistory.push({
      date: today,
      weight: parseFloat(weight),
      created_at: new Date().toISOString()
    });
    
    localStorage.setItem('weightHistory', JSON.stringify(filteredHistory));
    return filteredHistory[filteredHistory.length - 1];
  }
  
  try {
    const { data, error } = await supabase
      .from('weight_history')
      .insert({
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(weight)
      })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving weight:', error)
    throw error
  }
}

export const getWeightHistory = async (limit = 30) => {
  if (useLocalStorage) {
    const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
    return weightHistory.slice(-limit).reverse(); // Most recent first
  }
  
  try {
    const { data, error } = await supabase
      .from('weight_history')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error loading weight history:', error)
    return []
  }
}

// Notification settings functions
export const saveNotificationSettings = async (settings) => {
  if (useLocalStorage) {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    return settings;
  }
  
  try {
    const { data, error } = await supabase
      .from('notification_settings')
      .upsert({
        user_id: 'default', // For now, using default user
        settings: settings,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving notification settings:', error)
    throw error
  }
}

export const loadNotificationSettings = async () => {
  if (useLocalStorage) {
    const stored = localStorage.getItem('notificationSettings');
    return stored ? JSON.parse(stored) : null;
  }
  
  try {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('settings')
      .eq('user_id', 'default')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data?.settings || null
  } catch (error) {
    console.error('Error loading notification settings:', error)
    return null
  }
}
