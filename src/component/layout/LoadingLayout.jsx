import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalLoader from "../GlobalLoader";

export default function LoadingLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <GlobalLoader loading={loading} />
      {!loading && children}
    </>
  );
}