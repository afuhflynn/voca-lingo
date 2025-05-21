import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

const getUserSession = () => {
  useEffect(() => {
    const handleGetSession = async () => {
      const { data: session, isPending, error, refetch } = useSession();
    };
    handleGetSession();
  }, []);
};

export default getUserSession;
