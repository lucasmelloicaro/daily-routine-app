// WeightInput.jsx
export const WeightInput = ({ weight, setWeight, saveWeight, weightHistory, showWeightHistory, setShowWeightHistory }) => (
  <div className="mb-3 p-2 bg-gray-800 rounded-lg" style={{WebkitAppRegion: 'no-drag'}}>
    <div className="flex items-center justify-between mb-2">
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
      <div className="flex gap-2">
        <button
          onClick={saveWeight}
          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
          title="Save weight for today"
        >
          Add
        </button>
        <button
          onClick={() => setShowWeightHistory(!showWeightHistory)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
          title="View weight history"
        >
          📊
        </button>
      </div>
    </div>
    
    {showWeightHistory && (
      <div className="mt-2 p-2 bg-gray-900 rounded text-xs">
        <div className="text-white mb-1 font-medium">Recent Weights:</div>
        {weightHistory.length > 0 ? (
          <div className="max-h-20 overflow-y-auto">
            {weightHistory.map((entry, index) => (
              <div key={index} className="text-gray-300 flex justify-between">
                <span>{new Date(entry.date).toLocaleDateString()}</span>
                <span>{entry.weight}kg</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No weight history yet</div>
        )}
      </div>
    )}
  </div>
);

// ProgressBar.jsx
export const ProgressBar = ({ completedCount, totalTasks }) => (
  <div className="mb-3 text-center">
    <span className="text-sm font-medium text-gray-300">
      {completedCount}/{totalTasks} completed
    </span>
    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
      <div 
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{width: `${(completedCount/totalTasks) * 100}%`}}
      ></div>
    </div>
  </div>
);

// TaskList.jsx
export const TaskList = ({ tasks, toggleTask, accentColor = "green-500" }) => (
  <div className="space-y-2" style={{WebkitAppRegion: 'no-drag'}}>
    {tasks.map(task => (
      <label key={task.id} className="flex items-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className={`mr-3 w-4 h-4 accent-${accentColor}`}
        />
        <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.text}
        </span>
      </label>
    ))}
  </div>
);

// WeekendSection.jsx
export const WeekendSection = ({ 
  weekendExpanded, 
  setWeekendExpanded, 
  weekendTasks, 
  toggleWeekendTask 
}) => (
  <div className="mt-4" style={{WebkitAppRegion: 'no-drag'}}>
    <button
      onClick={() => setWeekendExpanded(!weekendExpanded)}
      className="w-full flex items-center justify-between p-3 bg-blue-900 rounded-lg hover:bg-blue-800 text-white"
    >
      <span className="font-medium">🏠 Weekend Tasks</span>
      <span className={`transform transition-transform ${weekendExpanded ? 'rotate-90' : ''}`}>
        ▶️
      </span>
    </button>
    
    {weekendExpanded && (
      <div className="mt-2 space-y-2">
        <TaskList 
          tasks={weekendTasks} 
          toggleTask={toggleWeekendTask} 
          accentColor="blue-500" 
        />
      </div>
    )}
  </div>
);

// CustomTasks.jsx
export const CustomTasks = ({ 
  customTasks, 
  newCustomTask, 
  setNewCustomTask, 
  addCustomTask, 
  toggleCustomTask, 
  removeCustomTask, 
  completedCustomCount 
}) => (
  <div className="mb-3" style={{WebkitAppRegion: 'no-drag'}}>
    {/* Custom Tasks Progress */}
    <div className="mb-2 text-center">
      <span className="text-sm font-medium text-gray-300">
        {completedCustomCount}/{customTasks.length} Custom completed
      </span>
      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: customTasks.length > 0 ? `${(completedCustomCount / customTasks.length) * 100}%` : '0%'
          }}
        />
      </div>
    </div>

    {/* Add Custom Task Input */}
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        value={newCustomTask}
        onChange={(e) => setNewCustomTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addCustomTask()}
        placeholder="Add custom task..."
        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-sm"
      />
      <button
        onClick={addCustomTask}
        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors"
        title="Add custom task"
      >
        Add
      </button>
    </div>

    {/* Custom Tasks List */}
    {customTasks.length > 0 && (
      <div className="space-y-1">
        {customTasks.map(task => (
          <div key={task.id} className="flex items-center gap-2 p-2 bg-gray-800 rounded">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCustomTask(task.id)}
              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.text}
            </span>
            <button
              onClick={() => removeCustomTask(task.id)}
              className="text-red-400 hover:text-red-300 text-lg font-bold leading-none"
              title="Remove task"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

// NotificationSettings.jsx
export const NotificationSettings = ({ 
  notificationSettings, 
  updateNotificationSetting, 
  showSettings, 
  setShowSettings,
  requestNotificationPermission 
}) => {
  const handlePermissionRequest = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      alert('Notifications enabled! 🔔');
    } else {
      alert('Please enable notifications in your device settings');
    }
  };

  // Function to adjust time by 30 minutes
  const adjustTime = (currentTime, direction) => {
    const [hours, minutes] = currentTime.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (direction === 'up') {
      totalMinutes += 30;
    } else {
      totalMinutes -= 30;
    }
    
    // Handle day overflow/underflow
    if (totalMinutes >= 24 * 60) totalMinutes = 0;
    if (totalMinutes < 0) totalMinutes = 23 * 60 + 30;
    
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const handleTimeAdjust = (taskId, direction) => {
    const currentTime = notificationSettings[taskId]?.deadline || '09:00';
    const newTime = adjustTime(currentTime, direction);
    updateNotificationSetting(taskId, 'deadline', newTime);
  };

  if (!showSettings) return null;

  return (
    <div className="mb-3 p-3 bg-gray-800 rounded-lg" style={{WebkitAppRegion: 'no-drag'}}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium">⚙️ Notification Settings</h3>
        <button
          onClick={() => setShowSettings(false)}
          className="text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      <button
        onClick={handlePermissionRequest}
        className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded mb-3 text-sm"
      >
        🔔 Enable Notifications
      </button>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {Object.entries(notificationSettings).map(([taskId, setting]) => (
          <div key={taskId} className="bg-gray-700 p-2 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-xs font-medium">
                {setting.taskName}
              </span>
              <input
                type="checkbox"
                checked={setting.enabled}
                onChange={(e) => updateNotificationSetting(taskId, 'enabled', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-xs">Deadline:</span>
              
              {/* Time adjustment buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleTimeAdjust(taskId, 'down')}
                  disabled={!setting.enabled}
                  className="bg-gray-600 hover:bg-gray-500 text-white w-6 h-6 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Decrease by 30 minutes"
                >
                  ▼
                </button>
                
                <input
                  type="time"
                  value={setting.deadline}
                  onChange={(e) => updateNotificationSetting(taskId, 'deadline', e.target.value)}
                  disabled={!setting.enabled}
                  className="bg-gray-600 text-white text-xs px-2 py-1 rounded border border-gray-500 disabled:opacity-50 w-20"
                  step="1800"
                />
                
                <button
                  onClick={() => handleTimeAdjust(taskId, 'up')}
                  disabled={!setting.enabled}
                  className="bg-gray-600 hover:bg-gray-500 text-white w-6 h-6 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Increase by 30 minutes"
                >
                  ▲
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-400">
        💡 Tip: Use ▲▼ buttons to adjust time by 30 minutes. Enable notifications for tasks and set deadlines. You'll be reminded if you haven't completed them by the deadline time.
      </div>
    </div>
  );
};
