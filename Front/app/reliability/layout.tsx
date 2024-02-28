import React from 'react';

export default function LayoutReliability({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col w-full gap-4 lg:flex-row">
        {children}
      </div>
    </div>
  );
}
