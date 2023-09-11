import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = () => {
    const cookie = new cookies();
    cookie.set('access', -1);
    cookie.set('refresh', -1);
    return NextResponse({ message: 'Succesfully logged user out.' });
}