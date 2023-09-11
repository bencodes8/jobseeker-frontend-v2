import axios from "axios";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/app/utils/constants";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const cookie = new cookies();
        const refreshCookieData = cookie.get('refresh') || null;

        const payload = {refresh: refreshCookieData.value}

        const { data } = await axios.post(`${BACKEND_URL}/api/token/refresh`, payload)
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
    }
}