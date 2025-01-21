import {ActivityIndicator, View} from 'react-native';
import {useStyle} from '../../hooks';

export default function Loading() {
  const styles = useStyle(() => ({
    container: {
      flex: 1,
    },
  }));

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.theme.color.text.primary} />
    </View>
  );
}
