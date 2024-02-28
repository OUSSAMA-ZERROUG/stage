import {
  Autocomplete,
  Checkbox,
  Grid,
  TextField,
} from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import ResponsiveGrid, { GridOptions } from './ResponsiveGrid';
import { defaultOptions } from '@/constants/selectOptionsType';

interface CustomAutocompleteProps {
  formikProps: FormikProps<any>;
  gridItem?: boolean;
  gridOptions?: GridOptions;
  field: { name: string; label: string };
  multiple?: boolean;
  options?: Option[];
  disabled?: boolean;
  onChange?: (
    e: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => void;
}

export type Option = {
  label: string;
  value: string;
};

function CustomAutocompleteInnerElement({
  formikProps,
  field,
  multiple,
  options,
  disabled = false,
  onChange,
}: CustomAutocompleteProps) {
  const error = formikProps.errors[field.name];
  let helperText = '';
  if (typeof error === 'object') {
    helperText = (error as Option).label;
  } else {
    helperText = error as string;
  }

  const showError =
    (formikProps.touched[field.name] ||
      formikProps.submitCount > 0) &&
    !!helperText;
  const defaultValue = multiple ? [] : null;

  return (
    <Autocomplete
      disabled={disabled}
      disablePortal
      getOptionKey={(option) => option.value}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.value === value.value
      }
      value={formikProps.values[field.name] || defaultValue}
      onChange={(e, value) => {
        formikProps.setFieldValue(field.name, value);
        if (onChange) {
          onChange(e, value);
        }
      }}
      options={options || (defaultOptions as Option[])}
      multiple={multiple}
      disableCloseOnSelect={multiple}
      className="w-full m-2"
      renderInput={(params) => (
        <TextField
          {...field}
          {...params}
          onBlur={formikProps.handleBlur}
          color="primary"
          error={showError}
          helperText={
            showError && (
              <span style={{ color: 'red' }}>{helperText}</span>
            )
          }
        />
      )}
    />
  );
}

function CustomAutocomplete({
  gridItem = true,
  ...props
}: CustomAutocompleteProps) {
  if (gridItem) {
    return (
      <ResponsiveGrid item {...props.gridOptions}>
        <CustomAutocompleteInnerElement {...props} />
      </ResponsiveGrid>
    );
  }

  return <CustomAutocompleteInnerElement {...props} />;
}

export default CustomAutocomplete;
