import {useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, Modal, Spacer} from '@ui/components';
import {sortListEmitter} from './utils';
import {sortMap} from '../Header/utils';
import {SortParams} from '../../service/model';
import {SortOptionsListProps} from './model';

export default function SortOptionsList({onPressSort}: SortOptionsListProps) {
  const [visible, setVisible] = useState(false);

  const sortList = useMemo<SortParams[]>(
    () => [
      {
        by: 'price',
        order: 'asc',
      },
      {
        by: 'price',
        order: 'desc',
      },
      {
        by: 'rating',
        order: 'asc',
      },
      {
        by: 'rating',
        order: 'desc',
      },
    ],
    [],
  );

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  function _onPressSort(sort: SortParams) {
    closeModal();
    onPressSort(sort);
  }

  useEffect(() => {
    sortListEmitter.on('openModal', openModal);
    sortListEmitter.on('closeModal', closeModal);

    return () => {
      sortListEmitter.off('openModal', openModal);
      sortListEmitter.off('closeModal', closeModal);
    };
  }, []);

  return (
    <Modal title="Sort by" onClose={closeModal} visible={visible}>
      <FlatList
        data={sortList}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer size="xs" />}
        renderItem={({item}) => (
          <Button
            {...sortMap[item.by][item.order]}
            onPress={() => _onPressSort(item)}
          />
        )}
      />
    </Modal>
  );
}
