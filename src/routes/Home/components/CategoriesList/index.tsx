import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {categoriesListEmitter} from './utils';
import {CategoriesListProps} from '../../model';
import {Button, Modal, Spacer} from '../../../../ui/components';
import {formatCategory} from '../Header/utils';

export default function CategoriesList({
  categories,
  onPressCategory,
}: CategoriesListProps) {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  function _onPressCategory(category: string) {
    closeModal();

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
    <Modal title="Select a filter" onClose={closeModal} visible={visible}>
      <FlatList
        data={categories}
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
    </Modal>
  );
}
