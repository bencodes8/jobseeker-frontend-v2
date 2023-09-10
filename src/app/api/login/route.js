import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async (request) => {
    const body = await request.json();

    const res = await fetch('http://127.0.0.1:8000/api/token/pair', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    const data = await res.json();
    if (data && data.refresh) {
        const { refresh: refreshToken } = data;
        cookies().set({
            name: 'refresh',
            value: refreshToken,
            httpOnly: true,
            path: '/'
        });
        return NextResponse.json({ data }, {
            status: 200,
        });
    } else {
        return NextResponse.json({ data }, {
            status: 401
        });
    }
}