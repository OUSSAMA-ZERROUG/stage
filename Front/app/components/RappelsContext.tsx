'use client';

import React from 'react';
import { FullRappel as Rappel } from '@/API/src/types';

const RappelsContext = React.createContext<{
  type: 'modification' | 'consultation' | undefined;
  setType: React.Dispatch<
    React.SetStateAction<'modification' | 'consultation' | undefined>
  >;
  rappels: Rappel[];
  setRappels: React.Dispatch<React.SetStateAction<Rappel[]>>;
  selectedRappel: Rappel | null;
  setSelectedRappel: React.Dispatch<
    React.SetStateAction<Rappel | null>
  >;
  refresh: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}>({
  rappels: [],
  setRappels: () => {},
  selectedRappel: null,
  setSelectedRappel: () => {},
  type: undefined,
  setType: () => {},
  refresh: 0,
  setRefresh: () => {},
});

function RappelsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rappels, setRappels] = React.useState<Rappel[]>([]);
  const [selectedRappel, setSelectedRappel] =
    React.useState<Rappel | null>(null);
  const [type, setType] = React.useState<
    'modification' | 'consultation' | undefined
  >();
  const [refresh, setRefresh] = React.useState(0);
  return (
    <RappelsContext.Provider
      value={{
        refresh,
        setRefresh,
        type,
        setType,
        rappels,
        setRappels,
        selectedRappel,
        setSelectedRappel,
      }}
    >
      {children}
    </RappelsContext.Provider>
  );
}

const useRappelsContext = () => {
  const context = React.useContext(RappelsContext);
  if (context === undefined) {
    throw new Error('useRappel must be used within a RappelProvider');
  }
  return context;
};

export { RappelsContextProvider, useRappelsContext };
