import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyle} from '../../hooks';
import Text from '../Text';
import {LayoutProps} from './model';
import {View} from 'react-native';

function Layout({header, children}: LayoutProps) {
  const styles = useStyle(theme => ({
    safeArea: {
      flex: 1,
      paddingHorizontal: theme.spacing.sml,
    },
    header: {
      flexDirection: 'row',
      paddingVertical: theme.spacing.md,
    },
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text variant="heading3">{header.title}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
}

export default Layout;
