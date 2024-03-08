import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return await NextResponse.json({ message: 'Hello GET' })
}

export async function POST(request: Request) {
    const data = await request.json()
    return await NextResponse.json({ data })
}
