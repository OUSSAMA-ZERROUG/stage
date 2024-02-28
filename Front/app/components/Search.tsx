'use client';

import api from '@/app/api/RequestHandler';
import CustomDateTimeField from '@/app/technicien/components/CustomDateTimeField';
import CustomTextField from '@/app/technicien/components/CustomTextField';
import ResponsiveGrid from '@/app/technicien/components/ResponsiveGrid';
import {
  BATIMENT,
  DEBUT,
  FIN,
  PERSONNE_DE_GARDE,
} from '@/constants/formNames/create-report.form-names';
import { Stack } from '@mui/material';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Formik, FormikProps } from 'formik';
import React, { use } from 'react';
import { useRappelsContext } from './RappelsContext';
import CustomAutocomplete from '../technicien/components/CustomAutocomplete';
import { useAppContext } from '../AppContext';

function Search({
  isSupervisor = false,
}: {
  isSupervisor?: boolean;
}) {
  const { setRappels, refresh } = useRappelsContext();
  const { persons } = useAppContext();
  const initialValues = {
    [DEBUT.name]: dayjs().subtract(10, 'year'),
    [FIN.name]: dayjs().add(10, 'year'),
    [BATIMENT.name]: 'GX-04',
    [PERSONNE_DE_GARDE.name]: null,
  };
  const [values, setValues] = React.useState<any>(initialValues);
  const fetchRappels = React.useCallback(
    async (values: StringifiedKeyObjectAnyType) => {
      const rappels = await api.GET(
        '/rappels/search',
        {
          start: values[DEBUT.name],
          end: values[FIN.name],
          building: values[BATIMENT.name],
          guardPerson: values[PERSONNE_DE_GARDE.name]?.value,
        },
        {
          tags: ['rappels-search'],
        },
      );
      if (rappels instanceof AxiosError) {
        console.error(rappels);
      }
      console.log(rappels);
      setRappels(rappels);
    },
    [setRappels],
  );

  React.useEffect(() => {
    if (refresh === 0) return;
    fetchRappels(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, fetchRappels]);

  const onSubmit = async (values: StringifiedKeyObjectAnyType) => {
    setValues(values);
    fetchRappels(values);
  };

  return (
    <Stack direction={'row'}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={null}
      >
        {(formikProps: FormikProps<any>) => (
          <form onSubmit={formikProps.handleSubmit}>
            <ResponsiveGrid
              gridOptions={{
                breakpoints: { xs: 3, sm: 8, md: 16, lg: 25 },
              }}
            >
              <CustomDateTimeField
                field={DEBUT}
                formikProps={formikProps}
              />
              <CustomDateTimeField
                field={FIN}
                formikProps={formikProps}
              />
              <CustomTextField
                field={BATIMENT}
                formikProps={formikProps}
              />
              {isSupervisor && (
                <CustomAutocomplete
                  field={PERSONNE_DE_GARDE}
                  formikProps={formikProps}
                  options={
                    Array.isArray(persons)
                      ? persons.map((person) => ({
                          value: person.Id_person,
                          label: person.name || person.userID,
                        }))
                      : []
                  }
                />
              )}
              <ResponsiveGrid item>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full max-w-sm px-4 py-2 m-2 h-14 text-base font-medium transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm text-secondary disabled:bg-primary disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primaryDark active:bg-orange-700"
                >
                  Rechercher
                </button>
              </ResponsiveGrid>
            </ResponsiveGrid>
          </form>
        )}
      </Formik>
    </Stack>
  );
}

export default Search;
