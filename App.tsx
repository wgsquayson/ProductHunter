import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes, {linking} from './src/routes';
import setupNotifications from './src/service/notifications';

function App() {
  setupNotifications();

  return (
    <SafeAreaProvider>
      <Routes linking={linking} />
    </SafeAreaProvider>
  );
}

export default App;
