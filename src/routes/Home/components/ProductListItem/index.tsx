import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import {Text} from '@ui/components';
import {useStyle} from '@ui/hooks';
import formatCurrency from '@utils/formatCurrency';
import {ProductListItem} from '../../service/model';
import FastImage from 'react-native-fast-image';

export default function ProductListItemComponent({
  thumbnail,
  title,
  price,
  ...props
}: Omit<ProductListItem, 'id'> & TouchableOpacityProps) {
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
    <TouchableOpacity style={styles.product} {...props}>
      <View style={styles.productInfo}>
        <FastImage
          source={{
            uri: thumbnail,
          }}
          style={styles.productThumbnail}
          resizeMode="contain"
        />
        <View style={styles.shrink}>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text variant="highlight">{formatCurrency(price)}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={styles.theme.fontSizes.md} />
    </TouchableOpacity>
  );
}
