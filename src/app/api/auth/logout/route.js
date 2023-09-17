import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const GET = async () => {
    const cookie = cookies();
    const refreshCookieExists = cookie.has('refresh');

    if (refreshCookieExists) {
        cookie.delete('refresh');
    }

    return NextResponse.json({ success: true });
}