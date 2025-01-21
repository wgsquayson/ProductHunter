import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import {FlatList, TextInput, View} from 'react-native';
import {Layout, Spacer} from '../../ui/components';
import {useStyle} from '../../ui/hooks';
import {useState} from 'react';
import {TemplateProps} from './model';
import ProductListItemComponent from './components/ProductListItem';
import Separator from './components/Separator';
import Footer from './components/Footer';

export default function ({
  products,
  onEndReached,
  loading,
  loadingMore,
}: TemplateProps) {
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

  const [search, setSearch] = useState('');

  return (
    <Layout header={{title: 'ProductHunter'}}>
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={
          <>
            <View style={styles.inputContainer}>
              <Icon
                name="search"
                color={styles.theme.color.text.inactive}
                size={styles.theme.fontSizes.md}
              />
              <TextInput
                placeholder="Search here..."
                placeholderTextColor={styles.theme.color.text.inactive}
                value={search}
                onChangeText={setSearch}
                style={styles.input}
              />
            </View>
            <Spacer size="sml" />
          </>
        }
        ItemSeparatorComponent={Separator}
        ListFooterComponent={() => <Footer isLoadingMore={loadingMore} />}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        renderItem={({item}) => <ProductListItemComponent {...item} />}
      />
    </Layout>
  );
}
