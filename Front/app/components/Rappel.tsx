'use client';

import React from 'react';
import { useRappelsContext } from '@/app/components/RappelsContext';
import dayjs from 'dayjs';
import FormTechnicien from '../technicien/FormTechnicien';
import * as fields from '@/constants/formNames/create-report.form-names';
import {
  categoryOptions,
  causeOptions,
  contactRolesOptions,
  deviationOptions,
  gardeOptions,
  impactOptions,
  interventionTypesOptions,
  stateOptions,
  supervisorRolesOptions,
  yesNoNaOptions,
  yesNoOptions,
} from '@/constants/selectOptionsType';
import { ActionType } from '@/API/src/constants';
import { revalidateTags } from '@/app/api/serverActions';

function Rappel() {
  const {
    selectedRappel: rappel,
    type,
    setRefresh,
  } = useRappelsContext();
  const [increment, setIncrement] = React.useState(0);

  React.useEffect(() => {
    setIncrement((i) => i + 1);
  }, [rappel]);

  if (!rappel) {
    return <></>;
  }

  console.log(rappel);

  const convert = (v: any) => {
    if (v === null || v === undefined) {
      return yesNoNaOptions[2];
    }
    return v ? yesNoNaOptions[0] : yesNoNaOptions[1];
  };
  const initialValues = {
    [fields.RAPPEL_ID.name]: rappel.Id_rappel,
    [fields.DEBUT.name]: dayjs(rappel.startAt),
    [fields.FIN.name]: dayjs(rappel.endAt),
    [fields.DEBUT_SUPP_1.name]: rappel.interventionPerson[0]?.startAt
      ? dayjs(rappel.interventionPerson[0]?.startAt)
      : dayjs(),
    [fields.DEBUT_SUPP_2.name]: rappel.interventionPerson[1]?.startAt
      ? dayjs(rappel.interventionPerson[1]?.startAt)
      : dayjs(),
    [fields.FIN_SUPP_1.name]: rappel.interventionPerson[0]?.endAt
      ? dayjs(rappel.interventionPerson[0]?.endAt)
      : dayjs(),
    [fields.FIN_SUPP_2.name]: rappel.interventionPerson[1]?.endAt
      ? dayjs(rappel.interventionPerson[1]?.endAt)
      : dayjs(),
    [fields.PERSONNE_DE_GARDE.name]: {
      value: rappel.guardPerson.Id_person,
      label: rappel.guardPerson.name,
    },
    [fields.PERSONNE_DE_SUPPORT_1.name]: rappel.interventionPerson[0]
      ? {
          value: rappel.interventionPerson[0]?.person?.Id_person,
          label: rappel.interventionPerson[0]?.person?.name,
        }
      : null,
    [fields.PERSONNE_DE_SUPPORT_2.name]: rappel.interventionPerson[1]
      ?.person
      ? {
          value: rappel.interventionPerson[1]?.person.Id_person,
          label: rappel.interventionPerson[1]?.person.name,
        }
      : null,
    [fields.TYPE_INTERVENTION.name]: interventionTypesOptions.find(
      (i) => i.value === rappel.interventionTypeName,
    ),
    [fields.CONTACT_NAME.name]: rappel.diffusion,
    [fields.ROLE_CONTACT.name]: contactRolesOptions.find(
      (r) => r.value === rappel.contactRoleName,
    ),
    [fields.ROLE_SURVEILLANT.name]:
      supervisorRolesOptions.find(
        (r) => r.value === rappel.subRoleName,
      ) || supervisorRolesOptions[0],
    [fields.AUTRE_CONTACT.name]: rappel.subRoleName || '',
    [fields.INFORMATION_CONTACT.name]: rappel.contactInformation,
    [fields.NOTIFICATION.name]: rappel.notification || '',
    [fields.CATEGORIE.name]: categoryOptions.find(
      (c) => c.value === rappel.categoryName,
    ),
    [fields.GARDE.name]: gardeOptions.find(
      (g) => g.value === rappel.guardPerson.garde,
    ),
    [fields.EQUIPEMENT.name]: rappel.equipment.tag,
    [fields.SITE.name]: rappel.equipment.site,
    [fields.BATIMENT.name]: rappel.equipment.building,
    [fields.FAMILLE.name]: rappel.equipment.family,
    [fields.SUB.name]: rappel.equipment.subfamily,
    [fields.DESCRIPTION.name]: rappel.equipment.description,
    [fields.PLANT_SECTION.name]: rappel.equipment.plantSection,
    [fields.FUNC_LOC.name]: rappel.equipment.functionalLocation,
    [fields.COST_CENTER.name]: rappel.equipment.costCenter,
    [fields.DETAIL_DIAGNOSTIC.name]: rappel.details,
    [fields.COUVERTURE_LMRA.name]: rappel.lmra
      ? yesNoOptions[0]
      : yesNoOptions[1],
    [fields.IMPACT.name]: impactOptions.filter((i) =>
      rappel.impact.find((imp) => imp.impactName === i.value),
    ),
    [fields.DEVIATION.name]: deviationOptions.filter((d) =>
      rappel.deviation.find((dev) => dev.deviationName === d.value),
    ),
    [fields.RAPPEL_RECURRENT.name]: convert(rappel.reccurence),
    [fields.CAUSE.name]: causeOptions.find(
      (c) => c.value === rappel.cause,
    ),
    [fields.ETAT_PRE_INTERVENTION.name]: stateOptions.find(
      (s) => s.value === rappel.preInterState,
    ),
    [fields.ACTIONS_CORRECTIVES.name]: rappel.have_actions.find(
      (a) => a.action.actionTypeName === ActionType.corrective,
    )?.action.description,
    [fields.ACTIONS_PREVENTIVES.name]: rappel.have_actions.find(
      (a) => a.action.actionTypeName === ActionType.preventive,
    )?.action.description,
    [fields.ETAT_POST_INTERVENTION.name]: stateOptions.find(
      (s) => s.value === rappel.postInterState,
    ),
    [fields.LMRA_DETAIL_1.name]: rappel.lmra
      ? convert(rappel.lmra.q1).value
      : null,
    [fields.LMRA_DETAIL_1_1.name]: rappel.lmra
      ? convert(rappel.lmra.q1_1).value
      : null,
    [fields.LMRA_DETAIL_2.name]: rappel.lmra
      ? convert(rappel.lmra.q2).value
      : null,
    [fields.LMRA_DETAIL_2_1.name]: rappel.lmra
      ? convert(rappel.lmra.q2_1).value
      : null,
    [fields.LMRA_DETAIL_3.name]: rappel.lmra
      ? convert(rappel.lmra.q3).value
      : null,
    [fields.LMRA_DETAIL_3_1.name]: rappel.lmra
      ? convert(rappel.lmra.q3_1).value
      : null,
    [fields.LMRA_DETAIL_4.name]: rappel.lmra
      ? convert(rappel.lmra.q4).value
      : null,
    [fields.LMRA_DETAIL_4_1.name]: rappel.lmra
      ? convert(rappel.lmra.q4_1).value
      : null,
    [fields.LMRA_DETAIL_5.name]: rappel.lmra
      ? convert(rappel.lmra.q5).value
      : null,
    [fields.LMRA_DETAIL_5_1.name]: rappel.lmra
      ? convert(rappel.lmra.q5_1).value
      : null,
    [fields.LMRA_DETAIL_6.name]: rappel.lmra
      ? convert(rappel.lmra.q6).value
      : null,
    [fields.LMRA_DETAIL_6_1.name]: rappel.lmra
      ? convert(rappel.lmra.q6_1).value
      : null,
    [fields.LMRA_DETAIL_7.name]: rappel.lmra
      ? convert(rappel.lmra.q7).value
      : null,
    [fields.LMRA_DETAIL_8.name]: rappel.lmra
      ? convert(rappel.lmra.q8).value
      : null,
    [fields.LMRA_DETAIL_9.name]: rappel.lmra
      ? convert(rappel.lmra.q9).value
      : null,
  };

  return (
    <>
      <FormTechnicien
        initialValues={initialValues}
        disableValidation
        type={type}
        key={increment}
        onSuccess={() => {
          revalidateTags(['rappels-search']);
          setRefresh((r) => r + 1);
        }}
      />
    </>
  );
}

export default Rappel;
