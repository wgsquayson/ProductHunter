import React from 'react';
import {TextInput, View} from 'react-native';
import {useStyle} from '../../../../ui/hooks';
import Icon from '@react-native-vector-icons/fontawesome';
import {Button, Spacer} from '../../../../ui/components';
import {HeaderProps} from '../../model';
import {getCategoryName, getSortButtonProps} from './utils';
import {categoriesListEmitter} from '../CategoriesList/utils';

export default function Header({
  search,
  onSearch,
  selectedCategory,
  selectedSort,
}: HeaderProps) {
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
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
    },
  }));

  function onPressCategory() {
    categoriesListEmitter.emit('openModal');
  }

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
      <View style={styles.buttonsContainer}>
        <Button
          text={getCategoryName(selectedCategory)}
          icon="filter"
          onPress={onPressCategory}
        />
        <Button {...getSortButtonProps(selectedSort)} />
      </View>
      <Spacer size="sml" />
    </>
  );
}
