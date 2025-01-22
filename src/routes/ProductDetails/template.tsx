import {ScrollView, View} from 'react-native';
import {Layout, Spacer, Text} from '../../ui/components';
import {useStyle} from '../../ui/hooks';
import {TemplateProps} from './model';
import Tag from './components/Tag';
import FastImage from 'react-native-fast-image';
import formatCurrency from '../../utils/formatCurrency';

export default function ({product}: TemplateProps) {
  const styles = useStyle(theme => ({
    image: {
      width: '100%',
      height: 300,
    },
    tagsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
      flexWrap: 'wrap',
    },
    productInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }));

  return (
    <Layout header={{title: 'Product details', canGoBack: true}}>
      <ScrollView>
        <FastImage
          style={styles.image}
          source={{uri: product.images[0], priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Spacer size="xs" />
        {product.tags.length > 0 ? (
          <View style={styles.tagsContainer}>
            {product.tags.map(tag => (
              <Tag key={tag} text={tag} />
            ))}
          </View>
        ) : null}
        <Text variant="heading1">{product.title}</Text>
        <Text color={styles.theme.color.text.detail}>{product.brand}</Text>
        <Spacer size="xxs" />
        <View style={styles.productInfo}>
          <Text variant="highlight">{formatCurrency(product.price)}</Text>
          <Text variant="highlight">{product.availabilityStatus}</Text>
        </View>
        <Spacer size="sml" />
        <Text color={styles.theme.color.text.detail}>
          {product.description}
        </Text>
      </ScrollView>
    </Layout>
  );
}
