import {useEffect} from 'react';

export default function useOnce(callback: () => void) {
  return useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
