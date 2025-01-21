import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import {useStyle} from '../../../../ui/hooks';
import {Button, Spacer, Text} from '../../../../ui/components';
import {formatCategory} from '../Header/utils';
import {useEffect, useState} from 'react';
import {addExcludeFilter, categoriesListEmitter} from './utils';
import Icon from '@react-native-vector-icons/fontawesome';
import {CategoriesListProps} from '../../model';

export default function CategoriesList({
  categories,
  onPressCategory,
  onRemoveFilters,
}: CategoriesListProps) {
  const [visible, setVisible] = useState(false);

  const styles = useStyle(theme => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.sml,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
      height: '60%',
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

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  function _onPressCategory(category: string) {
    closeModal();

    if (category === 'Remove filters') {
      return onRemoveFilters();
    }

    onPressCategory(category);
  }

  useEffect(() => {
    categoriesListEmitter.on('openModal', openModal);
    categoriesListEmitter.on('closeModal', closeModal);

    return () => {
      categoriesListEmitter.off('openModal', openModal);
      categoriesListEmitter.off('closeModal', closeModal);
    };
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text variant="highlight">Select a filter</Text>
            <TouchableOpacity>
              <Icon
                name="close"
                onPress={closeModal}
                size={styles.theme.fontSizes.md}
              />
            </TouchableOpacity>
          </View>
          <Spacer size="sml" />
          <FlatList
            data={addExcludeFilter(categories)}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Spacer size="xs" />}
            renderItem={({item}) => (
              <Button
                text={formatCategory(item)}
                onPress={() => _onPressCategory(item)}
              />
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
