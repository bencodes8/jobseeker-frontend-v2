import axios from "axios";
import { BACKEND_URL } from "@/app/utils/constants";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const payload = await request.json();
    
    try {
        const { data } = await axios.post(`${BACKEND_URL}/api/register`, payload)
        return NextResponse.json(data);

    } catch (err) {
        return new Error(err);
    }
}