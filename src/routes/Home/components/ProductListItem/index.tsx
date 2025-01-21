import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '../../../../ui/components';
import Icon from '@react-native-vector-icons/fontawesome';
import {useStyle} from '../../../../ui/hooks';
import {ProductListItem} from '../../model';

export default function ProductListItemComponent(item: ProductListItem) {
  const styles = useStyle(theme => ({
    product: {
      flexBasis: 0,
      flexDirection: 'row',
      padding: theme.spacing.sml,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.color.background.primaryDarker,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.sml,
    },
    productInfo: {
      flexDirection: 'row',
      gap: theme.spacing.sml,
      alignItems: 'center',
    },
    productThumbnail: {width: 60, height: 60},
    shrink: {
      flex: 1,
      maxWidth: '70%',
    },
  }));

  return (
    <TouchableOpacity style={styles.product}>
      <View style={styles.productInfo}>
        <Image
          source={{
            uri: item.thumbnail,
          }}
          style={styles.productThumbnail}
          resizeMode="contain"
        />
        <View style={styles.shrink}>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text variant="highlight">USD {item.price}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={styles.theme.fontSizes.md} />
    </TouchableOpacity>
  );
}
