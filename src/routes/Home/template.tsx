import Icon from '@react-native-vector-icons/fontawesome';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {Layout, Spacer, Text} from '../../ui/components';
import {useStyle} from '../../ui/hooks';
import {useState} from 'react';

export default function () {
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
    product: {
      flexDirection: 'row',
      padding: theme.spacing.sml,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.color.background.primaryDarker,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    productInfo: {
      flexDirection: 'row',
      gap: theme.spacing.sml,
      alignItems: 'center',
    },
    productThumbnail: {width: 60, height: 60},
  }));

  const [search, setSearch] = useState('');

  return (
    <Layout header={{title: 'ProductHunter'}}>
      <View style={styles.inputContainer}>
        <Icon
          name="search"
          color={styles.theme.color.text.inactive}
          size={styles.theme.fontSizes.md}
        />
        <TextInput
          placeholder="Type at least 3 characters to search"
          placeholderTextColor={styles.theme.color.text.inactive}
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>
      <Spacer size="sml" />
      <TouchableOpacity style={styles.product}>
        <View style={styles.productInfo}>
          <Image
            source={{
              uri: 'https://tempodecozimento.com.br/wp-content/uploads/2023/12/Arroz.png',
            }}
            style={styles.productThumbnail}
            resizeMode="contain"
          />
          <View>
            <Text>Rice</Text>
            <Text variant="highlight">USD 2,00</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={styles.theme.fontSizes.md} />
      </TouchableOpacity>
    </Layout>
  );
}
