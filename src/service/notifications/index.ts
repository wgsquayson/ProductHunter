import {LogLevel, OneSignal} from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from '@env';

export default function setupNotifications() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(ONESIGNAL_APP_ID);
  OneSignal.Notifications.requestPermission(true);
}
