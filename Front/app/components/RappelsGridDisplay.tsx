'use client';

import React from 'react';
import { useRappelsContext } from '../components/RappelsContext';
import { DataGrid, GridColDef, frFR } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { ActionType, ContactRoleType } from '@/API/src/constants';
import api from '@/app/api/RequestHandler';
import { AxiosError } from 'axios';

function RappelsGridDisplay({
  isSupervisor = false,
}: {
  isSupervisor?: boolean;
}) {
  const { rappels, setRappels, setSelectedRappel, setType } =
    useRappelsContext();
  const columns: GridColDef[] = [
    {
      field: 'Id_rappel',
      headerName: 'Id',
      width: 100,
    },
    {
      field: 'startAt',
      headerName: 'Début',
      width: 150,
      valueGetter(params) {
        return dayjs(params.value).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      field: 'endAt',
      headerName: 'Fin',
      width: 150,
      valueGetter(params) {
        return dayjs(params.value).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      field: 'guardPerson',
      headerName: 'Personne de garde',
      width: 150,
      valueGetter(params) {
        return `${params.value.name}`;
      },
    },
    {
      field: 'contactRoleName',
      headerName: 'Role de contact',
      width: 150,
      valueGetter(params) {
        if (
          (params.value === ContactRoleType.Other ||
            params.value === ContactRoleType.Supervisor) &&
          params.row.subRoleName
        ) {
          return `${params.value} : ${params.row.subRoleName}`;
        }
        return `${params.value}`;
      },
    },
    {
      field: 'details',
      headerName: 'Détails',
      width: 200,
    },
    {
      field: 'lmra',
      headerName: 'LMRA',
      width: 100,
      valueGetter(params) {
        return params.value ? 'Oui' : 'Non';
      },
    },
    {
      field: 'cause',
      headerName: 'Cause',
      width: 200,
    },
    {
      field: 'impact',
      headerName: 'Impacts',
      width: 200,
      valueGetter(params) {
        return params.value
          .map((impact: any) => impact.impactName)
          .join(', ');
      },
    },
    {
      field: 'actioncorrective',
      headerName: 'Actions correctives',
      width: 200,
      valueGetter(params) {
        return (params.row.have_actions as Array<any>).find(
          (action: any) =>
            action.action.actionTypeName === ActionType.corrective,
        ).action.description;
      },
    },
    {
      field: 'actionpreventive',
      headerName: 'Actions préventives',
      width: 200,
      valueGetter(params) {
        return (params.row.have_actions as Array<any>).find(
          (action: any) =>
            action.action.actionTypeName === ActionType.preventive,
        ).action.description;
      },
    },
    {
      field: '',
      headerName: 'Actions RE',
      width: 300,
      align: 'center',
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      disableReorder: true,
      renderCell(params) {
        return (
          <div className="flex flex-row w-full gap-2 justify-evenly">
            <button
              className="w-full px-4 py-2 font-bold transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm text-secondary disabled:bg-primary disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primaryDark active:bg-orange-700"
              onClick={() => {
                setSelectedRappel(params.row);
                setType('consultation');
              }}
            >
              Voir
            </button>
            {!isSupervisor && (
              <>
                <button
                  className="w-full px-4 py-2 font-bold transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm text-secondary disabled:bg-primary disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primaryDark active:bg-orange-700"
                  onClick={() => {
                    setSelectedRappel(params.row);
                    setType('modification');
                  }}
                >
                  Valider
                </button>
                <button
                  className="w-full px-4 py-2 font-bold transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm text-secondary disabled:bg-primary disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primaryDark active:bg-orange-700"
                  onClick={async () => {
                    const response = await api.DELETE(
                      `/rappels/${params.row.Id_rappel}`,
                    );
                    if (response instanceof AxiosError) {
                      console.log(response);
                    } else {
                      setRappels(
                        rappels.filter(
                          (rappel) =>
                            rappel.Id_rappel !== params.row.Id_rappel,
                        ),
                      );
                    }
                  }}
                >
                  Supprimer
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid
        localeText={
          frFR.components.MuiDataGrid.defaultProps.localeText
        }
        rows={rappels}
        columns={columns}
        disableRowSelectionOnClick
        showColumnVerticalBorder
        showCellVerticalBorder
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        getRowId={(row) => row.Id_rappel}
      />
    </div>
  );
}

export default RappelsGridDisplay;
