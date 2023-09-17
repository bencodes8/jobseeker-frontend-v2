import { cookies } from "next/headers";
import { BACKEND_URL } from "@/app/utils/constants";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const cookie = cookies();
    const payload = await request.json();

    const res = await fetch(`${BACKEND_URL}/api/token/pair`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const loginResponse = await res.json();

    if (loginResponse && loginResponse.access && loginResponse.refresh) {
        cookie.set({ name: 'refresh', value: loginResponse.refresh, httpOnly: true, secure: true, path: '/'});
        return NextResponse.json({ access: loginResponse.access });
    }

    return NextResponse({ detail: 'Something went wrong' })

}