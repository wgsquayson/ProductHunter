import {Loading, Text} from '../../../../ui/components';
import {EmptyListProps} from './model';

export default function EmptyList({loading, error}: EmptyListProps) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    <Text>{error}</Text>;
  }

  return <Text>No items found.</Text>;
}
