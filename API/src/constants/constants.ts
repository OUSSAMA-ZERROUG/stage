import * as z from 'zod';

// Actions

export enum ActionType {
  corrective = 'corrective',
  preventive = 'préventive',
}

// States

export enum StateType {
  IN_ORDER = 'En ordre',
  STOPPED = "A l'arrêt",
  DEGRADED = 'Dégradé',
}

// Impacts
export enum ImpactType {
  DataLoss = 'Perte de données',
  ProductionStop = 'Arrêt de production',
  GXP = 'Impact GXP',
}

// Deviations
export enum DeviationType {
  Deviations = 'Déviations',
  TicketL3 = 'Ticket L3',
  EM = 'EM',
}

// Categories
export enum CategoryType {
  AMSOceasoft = 'AMS Oceasoft',
  DeltaV = 'Delta V',
  Electricite = 'Electricité',
  HVACBMSFlux = 'HVAC/BMS/Flux',
  Instrumentation = 'Instrumentation',
  ITServerDMGPDWPDM = 'IT/Server/DMG/PDW/PDM',
  PEMSEMSCompteurs = 'PEMS/EMS/Compteurs',
  PLCHMI = 'PLC/HMI',
  Supervision = 'Supervision',
}

// Intervention types
export enum InterventionType {
  OnSite = 'Sur site',
  VPN = 'VPN',
  Phone = 'Téléphone',
}

// Garde
export enum GardeType {
  AMSOceasoft = 'AMS Oceasoft',
  AutomationRIX = 'RIX',
  AutomationPLCSCADA = 'PLC/SCADA',
  AutomationDCS = 'DCS',
}

// Contact roles
export enum ContactRoleType {
  LocalMaintenance = 'Maintenance locale',
  CMMaintenance = 'CM Maintenance',
  Production = 'Production',
  Supervisor = 'Surveillant',
  Other = 'Autre',
}

// Supervisor roles
export enum SupervisorRoleType {
  WEM = 'WEM',
  REM = 'REM',
}

// cause
export enum CauseType {
  AUTOMATION_ISSUE = 'Automation issue',
  HARDWARE_ISSUE = 'Equip. Hardware issue',
  OPERATOR_ERROR = 'Operator error/knowledge',
  PROCESS_DESIGN = 'Coord./Process design',
  OTHER = 'Support/Other',
}

// LMRA

export const lmraSchema = z.object({
  q1: z.boolean(),
  q1_1: z.boolean().nullable(),
  q2: z.boolean(),
  q2_1: z.boolean().nullable(),
  q3: z.boolean(),
  q3_1: z.boolean().nullable(),
  q4: z.boolean(),
  q4_1: z.boolean().nullable(),
  q5: z.boolean(),
  q5_1: z.boolean().nullable(),
  q6: z.boolean(),
  q6_1: z.boolean().nullable(),
  q7: z.boolean(),
  q8: z.boolean(),
  q9: z.boolean(),
});

export type lmraType = z.infer<typeof lmraSchema>;
