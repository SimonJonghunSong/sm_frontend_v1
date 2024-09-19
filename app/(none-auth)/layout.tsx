'use client';

import '../../styles/variable.css';
import '../../styles/reset.css';
import '../../styles/global.css';
import { useEffect, useState } from 'react';
import useAuthStore from '../../utils/useAuthStore';

const NoneAuthLayout = ({ children }) => {
  // const {userId} = useAuthStore();
  
  // useEffect(() => {
  //   // 로그인 된 상태로 진입 시 강제 로그아웃.
  //   if (userId !== null) {
  //     localStorage.clear();
  //   }
  // },[])

  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return;
  
  return <div className="noneAuthWrap">{children}</div>;
};


export default NoneAuthLayout;