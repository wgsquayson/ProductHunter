import React from 'react';
import {FlatList} from 'react-native';
import {Layout} from '../../ui/components';
import {TemplateProps} from './model';
import ProductListItemComponent from './components/ProductListItem';
import Separator from './components/Separator';
import Footer from './components/Footer';
import Header from './components/Header';
import EmptyList from './components/EmptyList';
import CategoriesList from './components/CategoriesList';

export default function ({
  products,
  onEndReached,
  loading,
  error,
  isLoadingMore,
  search,
  onSearch,
  selectedCategory,
  selectedSort,
  categories,
  onPressCategory,
  onRemoveFilters,
}: TemplateProps) {
  return (
    <>
      <Layout header={{title: 'ProductHunter'}}>
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <Header
              search={search}
              onSearch={onSearch}
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
            />
          }
          ItemSeparatorComponent={Separator}
          ListFooterComponent={Footer({isLoadingMore})}
          ListEmptyComponent={<EmptyList loading={loading} error={error} />}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          renderItem={({item}) => <ProductListItemComponent {...item} />}
        />
      </Layout>
      <CategoriesList
        categories={categories}
        onPressCategory={onPressCategory}
        onRemoveFilters={onRemoveFilters}
      />
    </>
  );
}
