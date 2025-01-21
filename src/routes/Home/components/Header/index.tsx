import React from 'react';
import {TextInput, View} from 'react-native';
import {useStyle} from '../../../../ui/hooks';
import Icon from '@react-native-vector-icons/fontawesome';
import {Spacer} from '../../../../ui/components';
import {HeaderProps} from '../../model';

export default function Header({search, onSearch}: HeaderProps) {
  const styles = useStyle(theme => ({
    inputContainer: {
      height: theme.spacing.xxl,
      borderWidth: 1,
      borderColor: theme.color.border.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.xs,
      gap: theme.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
  }));

  return (
    <>
      <View style={styles.inputContainer}>
        <Icon
          name="search"
          color={styles.theme.color.text.inactive}
          size={styles.theme.fontSizes.md}
        />
        <TextInput
          placeholder="Type at least 3 letters to start searching..."
          placeholderTextColor={styles.theme.color.text.inactive}
          value={search}
          onChangeText={onSearch}
          style={styles.input}
        />
      </View>
      <Spacer size="sml" />
    </>
  );
}
