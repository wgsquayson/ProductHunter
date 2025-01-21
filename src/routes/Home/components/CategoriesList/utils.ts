import mitt from 'mitt';
import {CategoriesListEvents} from './model';

export const categoriesListEmitter = mitt<CategoriesListEvents>();

export function addExcludeFilter(categories: string[]): string[] {
  return ['Remove filters', ...categories];
}
