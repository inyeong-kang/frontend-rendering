// Provider.tsx
'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Registry as StyledComponentRegistry } from '@/styles/registry';

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <StyledComponentRegistry>{children}</StyledComponentRegistry>
    </QueryClientProvider>
  );
}

export default Providers;
