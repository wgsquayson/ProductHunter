import {PropsWithChildren} from 'react';
import {ModalProps as RNModalProps} from 'react-native';

export type ModalProps = RNModalProps &
  PropsWithChildren & {
    title: string;
    onClose: () => void;
  };
