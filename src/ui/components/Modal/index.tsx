import Icon from '@react-native-vector-icons/fontawesome';
import Spacer from '../Spacer';
import Text from '../Text';
import {ModalProps} from './model';
import {Modal as RNModal, TouchableOpacity, View} from 'react-native';
import {useStyle} from '../../hooks';

export default function Modal({
  onClose,
  children,
  title,
  ...props
}: ModalProps) {
  const styles = useStyle(theme => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.sml,
      backgroundColor: theme.color.background.lowOpacity,
    },
    content: {
      maxHeight: '60%',
      padding: theme.spacing.sml,
      backgroundColor: theme.color.background.primary,
      borderRadius: theme.borderRadius.xl,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }));

  return (
    <RNModal
      animationType="fade"
      transparent
      onRequestClose={onClose}
      {...props}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text variant="highlight">{title}</Text>
            <TouchableOpacity>
              <Icon
                name="close"
                onPress={onClose}
                size={styles.theme.fontSizes.md}
              />
            </TouchableOpacity>
          </View>
          <Spacer size="sml" />
          {children}
        </View>
      </View>
    </RNModal>
  );
}
