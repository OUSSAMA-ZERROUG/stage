type UserWithRoleAndPerson = Extend<
  import('@prisma/client').User,
  [
    { role: import('@prisma/client').Role },
    { person: import('@prisma/client').Person },
  ]
>;
