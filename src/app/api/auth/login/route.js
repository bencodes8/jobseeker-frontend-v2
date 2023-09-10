import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async (request) => {
    const body = await request.json();

    try {
        const { data: tokenResponse } = await axios.post('http://127.0.0.1:8000/api/token/pair', body)

        if (tokenResponse && tokenResponse.access && tokenResponse.refresh) {
            const { access, refresh } = tokenResponse;
            const cookie = new cookies();
    
            cookie.set({
                    name: 'refresh',
                    value: refresh,
                    httpOnly: true,
                    secure: true,
                    path: '/'
                });
            
            cookie.set({
                name: 'access',
                value: access,
                httpOnly: true,
                secure: true,
                path: '/'
            });
    
            return NextResponse.json({ tokenResponse });
        }   
    } catch (e) {
        return NextResponse.json({ details: "Invalid credentials." }, {
            status: 401
        });
    }
}