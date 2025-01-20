import {View} from 'react-native';
import {useStyle} from '../../hooks';
import {SpacerProps} from './model';

function Spacer({size}: SpacerProps) {
  const styles = useStyle(theme => ({
    spacer: {
      height: theme.spacing[size],
      width: theme.spacing[size],
    },
  }));

  return <View style={styles.spacer} />;
}

export default Spacer;
