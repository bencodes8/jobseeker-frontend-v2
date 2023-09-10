import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/register?username=${username}&email=${email}`)
        return NextResponse.json(data);
        
    } catch (err) {
        console.error('Unable to connect to server. Please try again later. Maybe the server is offline?');
        throw new Error('Unable to connect to server. Please try again later. Maybe the server is offline?');
    }
}

export const POST = async (request) => {
    const payload = await request.json();
    
    try {
        const { data } = await axios.post('http://127.0.0.1:8000/api/register', payload)
        return NextResponse.json(data);

    } catch (err) {
        console.error('Registering user API. Maybe the server is offline?');
        throw new Error('Unable to connect to server. Please try again later.');
    }
}