'use client';

import {
  AUTRE_CONTACT,
  BATIMENT,
  CATEGORIE,
  CONTACT_NAME,
  COST_CENTER,
  DEBUT,
  DEBUT_SUPP_1,
  DEBUT_SUPP_2,
  DESCRIPTION,
  EQUIPEMENT,
  FAMILLE,
  FIN,
  FIN_SUPP_1,
  FIN_SUPP_2,
  FUNC_LOC,
  INFORMATION_CONTACT,
  NOTIFICATION,
  PERSONNE_DE_GARDE,
  PERSONNE_DE_SUPPORT_1,
  PERSONNE_DE_SUPPORT_2,
  PLANT_SECTION,
  ROLE_CONTACT,
  ROLE_SURVEILLANT,
  SITE,
  SUB,
  TYPE_INTERVENTION,
  GARDE,
} from '@/constants/formNames/create-report.form-names';
import { Stack } from '@mui/material';
import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import CustomAutocomplete, { Option } from './CustomAutocomplete';
import CustomDateTimeField from './CustomDateTimeField';
import TypoTitle from './TypoTitle';
import ResponsiveGrid from './ResponsiveGrid';
import CustomTextField from './CustomTextField';
import {
  categoryOptions,
  contactRolesOptions,
  gardeOptions,
  interventionTypesOptions,
  supervisorRolesOptions,
} from '@/constants/selectOptionsType';
import api from '@/app/api/RequestHandler';
import { debounce } from 'lodash';
import { useAppContext } from '@/app/AppContext';
import { ContactRoleType } from '@/API/src/constants';
import { equipment as EquipmentType } from '@/Prisma';
import { AxiosError } from 'axios';

function AdminTab({
  formikProps,
  persons,
  type,
}: {
  formikProps: FormikProps<any>;
  persons: StringifiedKeyObjectAnyType[];
  type: 'saisie' | 'modification' | 'consultation';
}) {
  const searchEquipmentByTag = React.useCallback(
    async (tag: string) => {
      if (!tag) {
        return;
      }
      const equipment: EquipmentType = await api.GET(
        `/equipment/${tag}`,
      );
      if (equipment instanceof AxiosError) {
        formikProps.setFieldValue(SITE.name, '');
        formikProps.setFieldValue(BATIMENT.name, '');
        formikProps.setFieldValue(FAMILLE.name, '');
        formikProps.setFieldValue(SUB.name, '');
        formikProps.setFieldValue(DESCRIPTION.name, '');
        formikProps.setFieldValue(PLANT_SECTION.name, '');
        formikProps.setFieldValue(FUNC_LOC.name, '');
        formikProps.setFieldValue(COST_CENTER.name, '');
      } else {
        formikProps.setFieldValue(SITE.name, equipment.site || '/');
        formikProps.setFieldValue(
          BATIMENT.name,
          equipment.building || '/',
        );
        formikProps.setFieldValue(
          FAMILLE.name,
          equipment.family || '/',
        );
        formikProps.setFieldValue(
          SUB.name,
          equipment.subfamily || '/',
        );
        formikProps.setFieldValue(
          DESCRIPTION.name,
          equipment.description || '/',
        );
        formikProps.setFieldValue(
          PLANT_SECTION.name,
          equipment.plantSection || '/',
        );
        formikProps.setFieldValue(
          FUNC_LOC.name,
          equipment.functionalLocation || '/',
        );
        formikProps.setFieldValue(
          COST_CENTER.name,
          equipment.costCenter || '/',
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const deboucedEquipementSearch = React.useMemo(
    () => debounce(searchEquipmentByTag, 1000),
    [searchEquipmentByTag],
  );

  const formatPersonsToOptions = React.useCallback(
    (persons: StringifiedKeyObjectAnyType[]) => {
      return Array.isArray(persons)
        ? persons.map((person) => ({
            value: person.Id_person,
            label: person.name || person.userID,
          }))
        : [];
    },
    [],
  );

  const onLoggedPersonChange = React.useCallback(
    (v: Option | null) => {
      if (v) {
        formikProps.setFieldValue(PERSONNE_DE_GARDE.name, v);
      }
      const personGarde = persons.find(
        (p) => p.Id_person === v?.value,
      )?.garde;
      if (personGarde) {
        formikProps.setFieldValue(
          GARDE.name,
          gardeOptions.find((g) => g.value === personGarde),
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [persons],
  );

  const { loggedPerson } = useAppContext();
  useEffect(() => {
    formikProps.setFieldValue(PERSONNE_DE_GARDE.name, loggedPerson);
    onLoggedPersonChange(loggedPerson);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedPerson]);

  return (
    <Stack direction={'column'} gap={2}>
      <TypoTitle>Personnel</TypoTitle>
      <ResponsiveGrid>
        <CustomDateTimeField
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={DEBUT}
        />
        <CustomDateTimeField
          formikProps={formikProps}
          field={FIN}
          disabled={type === 'consultation'}
        />
      </ResponsiveGrid>
      <ResponsiveGrid>
        <CustomAutocomplete
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={PERSONNE_DE_SUPPORT_1}
          options={formatPersonsToOptions(persons)}
        />
        {formikProps.values[PERSONNE_DE_SUPPORT_1.name] && (
          <>
            <CustomDateTimeField
              disabled={type === 'consultation'}
              formikProps={formikProps}
              field={DEBUT_SUPP_1}
            />
            <CustomDateTimeField
              disabled={type === 'consultation'}
              formikProps={formikProps}
              field={FIN_SUPP_1}
            />
          </>
        )}
      </ResponsiveGrid>
      {formikProps.values[PERSONNE_DE_SUPPORT_1.name] && (
        <ResponsiveGrid>
          <CustomAutocomplete
            disabled={type === 'consultation'}
            formikProps={formikProps}
            field={PERSONNE_DE_SUPPORT_2}
            options={formatPersonsToOptions(persons)}
          />
          {formikProps.values[PERSONNE_DE_SUPPORT_2.name] && (
            <>
              <CustomDateTimeField
                disabled={type === 'consultation'}
                formikProps={formikProps}
                field={DEBUT_SUPP_2}
              />
              <CustomDateTimeField
                disabled={type === 'consultation'}
                formikProps={formikProps}
                field={FIN_SUPP_2}
              />
            </>
          )}
        </ResponsiveGrid>
      )}
      <TypoTitle>Intervention</TypoTitle>
      <ResponsiveGrid>
        <CustomAutocomplete
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={TYPE_INTERVENTION}
          options={interventionTypesOptions}
        />
        <CustomAutocomplete
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={GARDE}
          options={gardeOptions}
        />
        <CustomAutocomplete
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={ROLE_CONTACT}
          options={contactRolesOptions}
        />
        {formikProps.values[ROLE_CONTACT.name]?.value ===
          ContactRoleType.Other && (
          <CustomTextField
            disabled={type === 'consultation'}
            formikProps={formikProps}
            field={AUTRE_CONTACT}
          />
        )}
        {formikProps.values[ROLE_CONTACT.name]?.value ===
          ContactRoleType.Supervisor && (
          <CustomAutocomplete
            disabled={type === 'consultation'}
            formikProps={formikProps}
            field={ROLE_SURVEILLANT}
            options={supervisorRolesOptions}
          />
        )}
        {/* <CustomTextField
          formikProps={formikProps}
          field={DIFFUSION}
        />
        //!lié au role du contact */}
        <CustomTextField
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={NOTIFICATION}
        />
        <CustomAutocomplete
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={CATEGORIE}
          options={categoryOptions}
        />
        <CustomTextField
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={CONTACT_NAME}
        />
      </ResponsiveGrid>
      <ResponsiveGrid>
        <CustomTextField
          disabled={type === 'consultation'}
          textarea
          gridOptions={{
            size: 2,
          }}
          formikProps={formikProps}
          field={INFORMATION_CONTACT}
        />
      </ResponsiveGrid>
      <TypoTitle>Equipement</TypoTitle>
      <ResponsiveGrid>
        <CustomTextField
          disabled={type === 'consultation'}
          formikProps={formikProps}
          field={EQUIPEMENT}
          onChange={(e) => deboucedEquipementSearch(e.target.value)}
        />
        <CustomTextField
          formikProps={formikProps}
          field={DESCRIPTION}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={SITE}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={BATIMENT}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={FAMILLE}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={SUB}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={PLANT_SECTION}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={FUNC_LOC}
          disabled
        />
        <CustomTextField
          formikProps={formikProps}
          field={COST_CENTER}
          disabled
        />
      </ResponsiveGrid>
    </Stack>
  );
}

export default AdminTab;
