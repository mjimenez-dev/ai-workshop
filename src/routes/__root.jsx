import { createRootRoute, Outlet } from '@tanstack/react-router';
import React from 'react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const RootComponent = () => {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
