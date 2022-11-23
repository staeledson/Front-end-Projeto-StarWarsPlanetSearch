import { useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const { planets } = useFetch();
  const value = useMemo(
    () => ({
      planets,
    }),
    [planets],
  );

  return <AppContext.Provider value={ value }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {}.isRequired;

export default AppProvider;
