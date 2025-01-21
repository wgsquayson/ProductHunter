export function getUrlPrefix(search?: string, category?: string) {
  if (search) {
    return `/products/search?q=${search?.toLowerCase()}&`;
  }

  if (category) {
    return `/products/category/${category}?`;
  }

  return '/products?';
}
