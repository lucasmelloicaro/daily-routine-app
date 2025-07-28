import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailyroutine.app',
  appName: 'Daily Routine',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#000000',
      overlay: false
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    },
    SplashScreen: {
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;
