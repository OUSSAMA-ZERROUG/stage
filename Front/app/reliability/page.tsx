import React from 'react';
import { RappelsContextProvider } from '../components/RappelsContext';
import Search from '../components/Search';
import RappelsGridDisplay from '../components/RappelsGridDisplay';
import Rappel from '../components/Rappel';

function PageReliability() {
  return (
    <RappelsContextProvider>
      <div className="flex flex-col w-full gap-5">
        <Search />

        <div className="w-full overflow-auto">
          <RappelsGridDisplay />
        </div>
        <Rappel />
      </div>
    </RappelsContextProvider>
  );
}

export default PageReliability;
