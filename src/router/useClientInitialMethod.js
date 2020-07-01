import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';

// run the initialMethod function on the client only
const initialMethod = (initialMethod) => {
  const store = useStore();
  let location = useLocation();

  const hasWindow = typeof window !== 'undefined';
  useEffect(() => {
    if (hasWindow) {
      initialMethod({ ...store, path: location.pathname });
    }
  }, []);
};

export default initialMethod;
