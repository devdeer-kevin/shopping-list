import { NextResponse } from 'next/server'
import items from '../../../../items.json'
const fs = require('fs')
const path = require('path')

export async function GET() {
    return NextResponse.json({
        status: 200,
        items,
    })
}

export async function POST(request: Request) {
    const data = await request.json()
    const __dirname = path.dirname(new URL(import.meta.url).pathname)
    const filePath = path.resolve(__dirname, '../../../../items.json')
    const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const newData = [...currentData, data]
    fs.writeFileSync(filePath, JSON.stringify(newData))
    return NextResponse.json({ status: 200, data })
}

export async function DELETE(request: Request) {
    const data = await request.json()
    const __dirname = path.dirname(new URL(import.meta.url).pathname)
    const filePath = path.resolve(__dirname, '../../../../items.json')
    const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const newData = currentData.filter((item: any) => item.name !== data.name)
    fs.writeFileSync(filePath, JSON.stringify(newData))
    return NextResponse.json({ status: 200, data })
}
