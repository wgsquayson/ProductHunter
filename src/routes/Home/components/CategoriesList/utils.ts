import mitt from 'mitt';
import {ModalEvents} from '@models/modal';

export const categoriesListEmitter = mitt<ModalEvents>();
