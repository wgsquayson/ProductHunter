import {useEffect, useState} from 'react';
import Template from './template';
import {fetchProducts} from './service';
import {ProductListItem} from './model';
import {mapProductItem} from './utils';

function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([]);

  async function getProducts() {
    const {data, error} = await fetchProducts();

    if (data) {
      return setProducts(mapProductItem(data));
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return <Template products={products} />;
}

export default Home;
