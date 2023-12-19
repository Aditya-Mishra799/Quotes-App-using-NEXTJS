import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// code to redirect a user to home page if they are not logged in from a particual page
export const checkLoginAndRedirect = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session?.user) {
    router.push("/");
  }
};
