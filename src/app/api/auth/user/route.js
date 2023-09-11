import axios from "axios";
import { BACKEND_URL } from "@/app/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    const cookie = new cookies();
    const accessTokenData = cookie.get('access') || null;

    const { data } = await axios.get(`${BACKEND_URL}/api/auth/user`, {
        headers: {
            Authorization: `Bearer ${accessTokenData.value}`
        }
    })
    return NextResponse.json(data);
}