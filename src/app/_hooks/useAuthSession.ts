import { useSession } from "next-auth/react";

export function useAuthSession() {
  const session = useSession();

  return { user: session?.data?.user, update: session?.update };
}
