'use client';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import resolveConfig from 'tailwindcss/resolveConfig';
import config from '../tailwind.config';
import api from './api/RequestHandler';
import { Option } from './technicien/components/CustomAutocomplete';

const Context = React.createContext<{
  persons: StringifiedKeyObjectAnyType[];
  loggedPerson: Option | null;
  setLoggedPerson: (person: Option | null) => void;
}>({
  persons: [],
  loggedPerson: null,
  setLoggedPerson: (person: Option | null) => {},
});

export const useAppContext = () => React.useContext(Context);

function AppContext({ children }: { children: React.ReactNode }) {
  const [loggedPerson, setLoggedPerson] =
    React.useState<Option | null>(null);
  const [persons, setPersons] = React.useState<
    StringifiedKeyObjectAnyType[]
  >([]);
  React.useEffect(() => {
    const fetchPersons = async () => {
      const persons = await api.GET('/person');
      setPersons(persons);
    };
    fetchPersons();
  }, []);
  const fullConfig = resolveConfig(config);
  const theme = createTheme({
    palette: {
      primary: {
        main: fullConfig.theme!.colors!.primary as string,
      },
      background: {
        default: fullConfig.theme!.colors!.primary as string,
      },
      common: {
        white: fullConfig.theme!.colors!.white as string,
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          autoComplete: 'off',
        },
      },
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Context.Provider
          value={{ loggedPerson, setLoggedPerson, persons }}
        >
          {children}
        </Context.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default AppContext;
