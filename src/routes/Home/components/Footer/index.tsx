import {ActivityIndicator, View} from 'react-native';
import {Spacer} from '../../../../ui/components';
import {useStyle} from '../../../../ui/hooks';
import {FooterProps} from './model';

export default function Footer({isLoadingMore}: FooterProps) {
  const styles = useStyle(theme => ({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: theme.spacing.sml,
    },
  }));

  if (isLoadingMore) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return <Spacer size="sml" />;
}
