import React from 'react';
import { RappelsContextProvider } from '../components/RappelsContext';
import Search from '../components/Search';
import RappelsGridDisplay from '../components/RappelsGridDisplay';
import Rappel from '../components/Rappel';

function PageSupervisor() {
  return (
    <RappelsContextProvider>
      <div className="flex flex-col w-full gap-5">
        <Search isSupervisor />

        <div className="w-full overflow-auto">
          <RappelsGridDisplay isSupervisor />
        </div>
        <Rappel />
      </div>
    </RappelsContextProvider>
  );
}

export default PageSupervisor;
