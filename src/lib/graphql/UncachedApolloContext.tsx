import { ApolloClient } from 'apollo-boost';
import React, { createContext } from 'react';

const UncachedApolloContext = createContext<ApolloClient<any> | null>(null);
export function UncachedApolloProvider({
  client,
  children,
}: {
  client: ApolloClient<any>;
  children: React.ReactNode;
}) {
  return (
    <UncachedApolloContext.Provider value={client}>
      {children}
    </UncachedApolloContext.Provider>
  );
}

export function useUncachedApolloClient() {
  const value = React.useContext(UncachedApolloContext);
  if (value === null) {
    throw new Error(
      'useUncachedApolloClient must be used within a UncachedApolloProvider',
    );
  }
  return value;
}
