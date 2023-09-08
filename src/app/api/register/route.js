import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/check-username-email?username=${username}&email=${email}`)
        const data = await res.json();

        return NextResponse.json(data);
        
    } catch (err) {
        console.error('Unable to connect to server. Please try again later. Maybe the server is offline?');
        throw new Error('Unable to connect to server. Please try again later. Maybe the server is offline?');
    }
}

export const POST = async (request) => {
    const body = await request.json();
    
    try {
        const res = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(body)
        })

        const data = await res.json();
        return NextResponse.json({ data });

    } catch (err) {
        console.error('Registering user API. Maybe the server is offline?');
        throw new Error('Unable to connect to server. Please try again later.');
    }
}