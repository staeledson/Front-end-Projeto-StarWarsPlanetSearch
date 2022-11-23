import { useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const { planets, isLoading } = useFetch();
  const value = useMemo(
    () => ({
      planets,
      isLoading,
    }),
    [planets, isLoading],
  );

  return <AppContext.Provider value={ value }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {}.isRequired;

export default AppProvider;
