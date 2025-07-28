import { useEffect } from 'react';
import { useDailyRoutine } from './hooks/useDailyRoutine';
import { useNotificationSettings } from './hooks/useNotificationSettings';
import { WeightInput, ProgressBar, TaskList, WeekendSection, CustomTasks, NotificationSettings } from './components/TaskComponents';

function App() {
  const {
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
  } = useDailyRoutine();

  const {
    notificationSettings,
    showSettings,
    setShowSettings,
    updateNotificationSetting,
    checkNotifications,
    requestNotificationPermission
  } = useNotificationSettings();

  // Check for notifications every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkNotifications(tasks);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks, checkNotifications]);

  // Get current day of the week
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  return (
    <div 
      className="w-[350px] mx-auto mt-2 p-4 bg-black rounded-2xl shadow-lg"
      style={{WebkitAppRegion: 'drag'}}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">{getCurrentDay()} → Daily Routine 📋</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm transition-colors"
            style={{WebkitAppRegion: 'no-drag'}}
            title="Notification settings"
          >
            ⚙️
          </button>
          <button
            onClick={refreshData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm transition-colors"
            style={{WebkitAppRegion: 'no-drag'}}
            title="Refresh data from cloud"
          >
            🔄
          </button>
        </div>
      </div>
      
      <WeightInput 
        weight={weight} 
        setWeight={setWeight}
        saveWeight={saveWeight}
        weightHistory={weightHistory}
        showWeightHistory={showWeightHistory}
        setShowWeightHistory={setShowWeightHistory}
      />
      
      <NotificationSettings
        notificationSettings={notificationSettings}
        updateNotificationSetting={updateNotificationSetting}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        requestNotificationPermission={requestNotificationPermission}
      />
      
      <CustomTasks 
        customTasks={customTasks}
        newCustomTask={newCustomTask}
        setNewCustomTask={setNewCustomTask}
        addCustomTask={addCustomTask}
        toggleCustomTask={toggleCustomTask}
        removeCustomTask={removeCustomTask}
        completedCustomCount={completedCustomCount}
      />
      
      <ProgressBar completedCount={completedCount} totalTasks={tasks.length} />
      
      <TaskList tasks={tasks} toggleTask={toggleTask} />
      
      <WeekendSection 
        weekendExpanded={weekendExpanded}
        setWeekendExpanded={setWeekendExpanded}
        weekendTasks={weekendTasks}
        toggleWeekendTask={toggleWeekendTask}
      />
    </div>
  );
}

export default App;
