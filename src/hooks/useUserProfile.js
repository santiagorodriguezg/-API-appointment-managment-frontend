import { useEffect, useState } from 'react';
import { GetMyProfileService } from '../services/Users';

const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        setErrorMsg(false);
        setLoading(true);
        const res = await GetMyProfileService();
        setUser(res.data);
        setLoading(false);
      } catch {
        setLoading(false);
        setErrorMsg(true);
      }
    };
    load();
  }, []);

  return [
    {
      loading,
      user,
      errorMsg,
      redirect,
      setRedirect,
    },
    setErrorMsg,
  ];
};

export default useUserProfile;
