'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import packageJson from '@/package.json';
import Logo from '@/assets/LogoGSK.png';
import UserCircleIcon from '@heroicons/react/20/solid/esm/UserCircleIcon';
import { Title } from '../../components/UI';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../AppContext';

export function Navbar() {
  const { version } = packageJson;
  const [openLogin, setOpenLogin] = React.useState(false);

  const { loggedPerson, setLoggedPerson, persons } = useAppContext();

  return (
    <nav className="sticky top-0 z-40 flex flex-col w-screen text-secondary drop-shadow-2xl">
      {/* Desktop version */}
      <div className="hidden md:inline-block">
        <div className="flex flex-row items-center justify-start w-screen h-24 gap-6 bg-primaryLight drop-shadow-xl">
          <div className="flex items-center justify-center h-full p-4 bg-secondary w-60">
            <Image src={Logo} alt="Logo" className="object-contain" />
          </div>
          <div className="flex flex-row items-center justify-between w-full h-full p-4 ">
            <div className="flex flex-col items-start justify-start">
              <Title component="h2" className="decoration-white">
                Interface rapport de garde
              </Title>
              <Title component="h5">
                {dayjs().locale('fr').format('dddd DD MMMM YYYY')}
              </Title>
              <Title component="h6">Version {version}</Title>
            </div>
            <div
              className="flex flex-row items-center justify-end gap-1"
              onClick={() => {
                setOpenLogin(true);
              }}
            >
              <div className="flex flex-col items-end justify-end">
                <Title component="h4">
                  {loggedPerson ? loggedPerson.label : 'Utilisateur'}
                </Title>
                <Title component="h6">Role</Title>
              </div>
              <UserCircleIcon className="w-12 h-12" />
            </div>
          </div>
        </div>
        <Dialog
          open={openLogin}
          onClose={() => setOpenLogin(false)}
          maxWidth="sm"
          fullWidth
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            paddingInline={2}
            alignItems={'center'}
          >
            <DialogTitle>Connexion</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => setOpenLogin(false)}
              className="w-10 h-10"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <DialogContent dividers>
            <DialogContent className="flex flex-col gap-5">
              <Autocomplete
                getOptionKey={(option) => option.value}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                value={loggedPerson}
                onChange={(e, value) => {
                  setLoggedPerson(value);
                }}
                options={
                  Array.isArray(persons)
                    ? persons.map((person: any) => ({
                        value: person.Id_person,
                        label: person.name || person.userID,
                      }))
                    : []
                }
                renderInput={(params) => (
                  <TextField {...params} color="primary" />
                )}
              />
            </DialogContent>
          </DialogContent>
        </Dialog>
        <div className="bg-secondary">
          <div className="flex flex-row items-center w-screen h-12 bg-primary/90 justify-evenly">
            <Link
              href="/technicien"
              className="flex items-center justify-center w-full h-full hover:bg-primaryDark"
            >
              <Title component="h4">Interface Technicien</Title>
            </Link>
            <Link
              href="/reliability"
              className="flex items-center justify-center w-full h-full hover:bg-primaryDark"
            >
              <Title component="h4">Interface RE</Title>
            </Link>
            <Link
              href="/supervisor"
              className="flex items-center justify-center w-full h-full hover:bg-primaryDark"
            >
              <Title component="h4">Interface Superviseur</Title>
            </Link>
            <Link
              href="/reporting"
              className="flex items-center justify-center w-full h-full hover:bg-primaryDark"
            >
              <Title component="h4">Interface Reporting</Title>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className="flex flex-col items-center justify-center w-screen h-18 bg-primary/90 md:hidden">
        <div className="flex flex-row items-center justify-between w-full h-full p-4">
          <div className="flex flex-row items-center justify-start">
            <div className="flex items-center justify-center w-20 h-full p-4 bg-secondary">
              <Image
                src={Logo}
                alt="Logo"
                className="object-contain"
              />
            </div>
            <Title component="h2">Interface rapport de garde</Title>
          </div>
          <div className="flex flex-row items-center justify-end gap-1">
            <UserCircleIcon className="w-12 h-12" />
          </div>
        </div>
      </div>
    </nav>
  );
}
