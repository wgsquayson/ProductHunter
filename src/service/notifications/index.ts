import {LogLevel, OneSignal} from 'react-native-onesignal';

export default function setupNotifications() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize('4998e1be-e69b-4d71-a4a6-0609f6ac842f');
  OneSignal.Notifications.requestPermission(true);
}
