import {ButtonProps} from '../../../../ui/components/';
import {SortParams} from '../../model';

export function getSortButtonProps(sort?: SortParams): ButtonProps {
  const sortMap: Record<
    SortParams['by'],
    Record<SortParams['order'], ButtonProps>
  > = {
    price: {
      asc: {
        text: 'Higher price',
        icon: 'sort-up',
      },
      desc: {
        text: 'Lower price',
        icon: 'sort-down',
      },
    },
    rating: {
      asc: {
        text: 'Higher rating',
        icon: 'sort-up',
      },
      desc: {
        text: 'Lower rating',
        icon: 'sort-down',
      },
    },
  };

  if (sort) {
    return sortMap[sort.by][sort.order];
  }

  return {
    text: 'Sort',
    icon: 'sort',
  };
}

export function formatCategory(category: string) {
  if (category.includes('-')) {
    const [firstName, secondName] = category.split('-');

    if (firstName && secondName) {
      return `${firstName[0].toUpperCase() + firstName.substring(1)} ${
        secondName[0].toUpperCase() + secondName.substring(1)
      }`;
    }
  }

  return category[0].toUpperCase() + category.substring(1);
}

export function getCategoryName(category?: string) {
  if (category) {
    return formatCategory(category);
  }

  return 'Filter';
}
