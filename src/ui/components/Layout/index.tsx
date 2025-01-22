import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyle} from '../../hooks';
import Text from '../Text';
import {LayoutProps} from './model';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome';

function Layout({header, children}: LayoutProps) {
  const navigation = useNavigation();

  const styles = useStyle(theme => ({
    safeArea: {
      flex: 1,
      paddingHorizontal: theme.spacing.sml,
    },
    header: {
      flexDirection: 'row',
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.sml,
      alignItems: 'center',
    },
  }));

  const showBackButton = header.canGoBack && navigation.canGoBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {showBackButton ? (
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" size={styles.theme.fontSizes.md} />
          </TouchableOpacity>
        ) : null}
        <Text variant="heading3">{header.title}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
}

export default Layout;
