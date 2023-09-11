import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/app/utils/constants';

export const POST = async (request) => {
    const cookie = new cookies();
    const body = await request.json();

    try {
        const { data: tokenResponse } = await axios.post(`${BACKEND_URL}/api/token/pair`, body)

        if (tokenResponse && tokenResponse.access && tokenResponse.refresh) {
            const { access, refresh } = tokenResponse;
            cookie.set({ name: 'refresh', value: refresh, httpOnly: true, secure: true, path: '/' });
            cookie.set({ name: 'access', value: access, httpOnly: true, secure: true, path: '/' });
    
            return NextResponse.json(tokenResponse);
        }   
    } catch (error) {
        const invalidUserResponse = error.response.data;
        return NextResponse.json(invalidUserResponse);
    }
}