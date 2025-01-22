import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import {useStyle} from '@ui/hooks';
import {Button, Spacer} from '@ui/components';
import {HeaderProps} from './model';
import {getCategoryName, getSortButtonProps} from './utils';
import {categoriesListEmitter} from '../CategoriesList/utils';
import {sortListEmitter} from '../SortOptionsList/utils';

export default function Header({
  search,
  onSearch,
  selectedCategory,
  selectedSort,
  onClearFilters,
  onClearSearch,
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

  function onPressSort() {
    sortListEmitter.emit('openModal');
  }

  const hasFilters = selectedCategory || selectedSort;

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
        {search ? (
          <TouchableOpacity
            onPress={onClearSearch}
            hitSlop={styles.theme.spacing.sml}>
            <Icon
              name="close"
              color={styles.theme.color.text.inactive}
              size={styles.theme.fontSizes.md}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Spacer size="sml" />
      <View style={styles.buttonsContainer}>
        <Button
          text={getCategoryName(selectedCategory)}
          icon="filter"
          onPress={onPressCategory}
        />
        <Button {...getSortButtonProps(selectedSort)} onPress={onPressSort} />
      </View>
      <Spacer size="sml" />
      {hasFilters ? (
        <>
          <Button text="Clear filters" icon="close" onPress={onClearFilters} />
          <Spacer size="sml" />
        </>
      ) : null}
    </>
  );
}
