import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const cookie = new cookies();

    const { value: accessToken } = cookie.get('access');
    const { value: refreshToken } = cookie.get('refresh');

    const payload = {
        token: accessToken
    }

    try {
        const { data: authenticated } = await axios.post('http://127.0.0.1:8000/api/token/verify', payload)

        return NextResponse.json({ authenticated });
    } catch (error) {

        if (error.response && error.response.status === 401) {
            const payload = {
                refresh: refreshToken
            }
            try {
                const { data: refreshResponse } = await axios.post('http://127.0.0.1:8000/api/token/refresh', payload)

                if (refreshResponse && refreshResponse.access && refreshResponse.refresh) {
                    const { access, refresh } = refreshResponse;
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
                }
            } catch (e) {
                if (error.response && error.response.status === 401) {
                    const invalidTokenResponse = error.response.data;
                    return NextResponse.json(invalidTokenResponse, {status: 401});
                }
            }
        } else {
            // Handle other errors here
            return NextResponse.json({ data: 'An error occurred' }, { status: 500 });
        }
    }
} 