import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    const cookie = new cookies();
    const accessToken = cookie.get('access') || null;
    const refreshToken = cookie.get('refresh') || null;

    return NextResponse.json({access: accessToken.value, refresh: refreshToken.value});
}