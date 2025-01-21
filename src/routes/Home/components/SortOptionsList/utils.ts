import mitt from 'mitt';
import {ModalEvents} from '../../../../models/modal';

export const sortListEmitter = mitt<ModalEvents>();
