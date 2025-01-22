import {Layout} from '../../ui/components';
import {TemplateProps} from './model';

export default function ({}: TemplateProps) {
  return <Layout header={{title: 'Product details', canGoBack: true}} />;
}
