'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '../../utils/useAuthStore';

export default function Main() {
    const {userId} = useAuthStore();

    // FIX: 로그인 여부에 따라 홈 화면 분기
    const isAuth = userId;
    const router = useRouter();

    useEffect(() => {
        if (!isAuth) {
            router.push('/login');
        }
    }, [isAuth, router]);
}
