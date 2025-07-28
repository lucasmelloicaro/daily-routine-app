import { useState, useEffect } from 'react';
import { saveNotificationSettings, loadNotificationSettings } from '../supabase';

// Import Capacitor for native notifications
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useNotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({});
  const [showSettings, setShowSettings] = useState(false);

  // Default notification settings for tasks (24-hour format)
  const defaultSettings = {
    1: { enabled: false, deadline: '08:00', taskName: '⚖️ Check weight' },
    2: { enabled: false, deadline: '08:30', taskName: '💊 Pantoprazol' },
    3: { enabled: false, deadline: '09:00', taskName: '☕ Black coffee' },
    4: { enabled: false, deadline: '10:00', taskName: '💧 500ML WATER' },
    5: { enabled: false, deadline: '13:00', taskName: '🍽️ LUNCH' },
    6: { enabled: false, deadline: '14:00', taskName: '💪 CREATINE' },
    7: { enabled: false, deadline: '15:00', taskName: '💧 1L water' },
    8: { enabled: false, deadline: '16:00', taskName: '🍎 SNACK' },
    9: { enabled: false, deadline: '17:00', taskName: '☕ COFFEE' },
    10: { enabled: false, deadline: '18:00', taskName: '🏋️ GYM' },
    11: { enabled: false, deadline: '19:00', taskName: '💧 500ML WATER' },
    12: { enabled: false, deadline: '20:00', taskName: '🍽️ DINNER' },
    13: { enabled: false, deadline: '21:00', taskName: '🧹 Mini clean house' },
    14: { enabled: false, deadline: '21:30', taskName: '🥩 PROTEIN' },
    15: { enabled: false, deadline: '22:00', taskName: '💊 VITAMIN' },
    16: { enabled: false, deadline: '23:00', taskName: '📚 30Min Study' }
  };

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await loadNotificationSettings();
        setNotificationSettings(settings || defaultSettings);
      } catch (error) {
        console.error('Error loading notification settings:', error);
        setNotificationSettings(defaultSettings);
      }
    };
    loadSettings();
  }, []);

  // Save settings when they change
  const updateNotificationSetting = async (taskId, setting, value) => {
    const newSettings = {
      ...notificationSettings,
      [taskId]: {
        ...notificationSettings[taskId],
        [setting]: value
      }
    };
    
    setNotificationSettings(newSettings);
    
    try {
      await saveNotificationSettings(newSettings);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  // Check if any task notifications should fire
  const checkNotifications = (tasks) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    Object.entries(notificationSettings).forEach(([taskId, setting]) => {
      if (setting.enabled && currentTime === setting.deadline) {
        const task = tasks.find(t => t.id === parseInt(taskId));
        if (task && !task.completed) {
          // Trigger notification
          showTaskNotification(setting.taskName, setting.deadline);
        }
      }
    });
  };

  const showTaskNotification = async (taskName, deadline) => {
    // Check if running on mobile (Capacitor)
    if (Capacitor.isNativePlatform()) {
      // Native Android notification
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Daily Routine Reminder 🏃‍♂️',
              body: `Time for: ${taskName} (Deadline: ${deadline})`,
              id: Date.now(),
              schedule: { at: new Date() },
              sound: 'default',
              attachments: [],
              actionTypeId: '',
              extra: { taskName, deadline }
            }
          ]
        });
      } catch (error) {
        console.error('Error showing native notification:', error);
      }
    } else {
      // Web browser notification (desktop)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Daily Routine Reminder', {
          body: `Time for: ${taskName} (Deadline: ${deadline})`,
          icon: '/favicon.ico'
        });
      }
    }
    
    console.log(`Notification: ${taskName} deadline (${deadline}) reached!`);
  };

  // Request notification permission (works for both web and mobile)
  const requestNotificationPermission = async () => {
    if (Capacitor.isNativePlatform()) {
      // Request Android notification permission
      try {
        const result = await LocalNotifications.requestPermissions();
        return result.display === 'granted';
      } catch (error) {
        console.error('Error requesting native notification permission:', error);
        return false;
      }
    } else {
      // Web browser permission
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
    }
    return false;
  };

  return {
    notificationSettings,
    showSettings,
    setShowSettings,
    updateNotificationSetting,
    checkNotifications,
    requestNotificationPermission,
    defaultSettings
  };
};
