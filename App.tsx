import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes, {linking} from './src/routes';

function App() {
  return (
    <SafeAreaProvider>
      <Routes linking={linking} />
    </SafeAreaProvider>
  );
}

export default App;
