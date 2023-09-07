import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    const res = await fetch(`http://127.0.0.1:8000/api/check-username-email?username=${username}&email=${email}`)
    const data = await res.json();

    return NextResponse.json({ data });
}

export const POST = async (request) => {
    
}