
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FreeTrial = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page with signup tab
    navigate("/auth?tab=signup", { replace: true });
  }, [navigate]);

  return null;
};

export default FreeTrial;
