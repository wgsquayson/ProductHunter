import Icon from '@react-native-vector-icons/fontawesome';
import {TextInput, View} from 'react-native';
import {Layout} from '../../ui/components';
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
    </Layout>
  );
}
