import { createContext, useContext, type ReactNode } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { type CurrentUserContextQuery } from "./__generated__/CurrentUserContextQuery.graphql";

const CurrentUserContext = createContext<
  CurrentUserContextQuery["response"] | null
>(null);

const currentUserQuery = graphql`
  query CurrentUserContextQuery {
    currentUser {
      id
      name
      surname
      email
      city {
        id
        name
        slug
        country {
          id
          name
          code
        }
      }
      defaultSport {
        id
        name
        slug
      }
    }
  }
`;

interface CurrentUserProviderProps {
  children: ReactNode;
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const data = useLazyLoadQuery<CurrentUserContextQuery>(
    currentUserQuery,
    {},
    { fetchPolicy: "store-and-network" }
  );

  return (
    <CurrentUserContext.Provider value={data}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (context === null) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context.currentUser;
}
