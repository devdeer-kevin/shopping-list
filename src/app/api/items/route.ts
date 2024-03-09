import { NextResponse } from 'next/server'
import items from '../../../../items.json'
import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Retrieves the list of items.
 * @returns A NextResponse object with the list of items.
 */
export async function GET() {
    // Return the list of items
    return NextResponse.json({
        status: 200,
        items,
    })
}

/**
 * Adds a new item to the list.
 * @param request - The request object containing the new item data.
 * @returns A NextResponse object with the updated list of items.
 */
export async function POST(request: Request) {
    // Check if the request body is valid
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'Invalid request' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // Parse the request body
    let data
    try {
        data = await request.json()
    } catch (error) {
        // Check if the JSON format is valid
        return new Response(JSON.stringify({ message: 'Invalid JSON format' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // Check if the data is valid
    if (!data.name || typeof data.name !== 'string') {
        return new Response(JSON.stringify({ message: 'Invalid item data: name is required and must be a string' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // Get the file path
    const __dirname = path.dirname(new URL(import.meta.url).pathname)

    // Read the file
    const filePath = path.resolve(__dirname, '../../../../items.json')

    let currentData
    try {
        currentData = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    } catch (error) {
        // Error handling for read errors
        return new Response(JSON.stringify({ message: 'Failed to read the item file' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // Add the new data
    const newData = [...currentData, data]

    try {
        // Write the new data
        await fs.writeFile(filePath, JSON.stringify(newData))
    } catch (error) {
        // Error handling for write errors
        return new Response(JSON.stringify({ message: 'Failed to save the item' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // Return the new data
    return new Response(JSON.stringify({ status: 201, data }), {
        status: 201, // Sets the status code to 201 Created
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

/**
 * Deletes an item from the list.
 * @param request - The request object containing the item to be deleted.
 * @returns A NextResponse object with the updated list of items.
 */
export async function DELETE(request: Request) {
    // Checks if the request body is valid
    if (!request.body) {
        return new Response(JSON.stringify({ message: 'No data provided' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    let data: { name: string } | undefined
    try {
        // Parse the request body
        data = await request.json()
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid JSON format' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    // Checks if the data is valid
    if (!data?.name) {
        return new Response(JSON.stringify({ message: 'Missing item name' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    // File path to the items.json file
    const __dirname = path.dirname(new URL(import.meta.url).pathname)
    // Read the file
    const filePath = path.resolve(__dirname, '../../../../items.json')

    let currentData
    try {
        // Reads the file
        currentData = JSON.parse(await fs.readFile(filePath, 'utf-8'))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to read the item file' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    // Filters the data
    const newData = currentData.filter((item: any) => item.name !== data?.name)

    try {
        // Write the new data
        await fs.writeFile(filePath, JSON.stringify(newData))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to update the item file' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    // Returns the updated data
    return new Response(JSON.stringify({ message: 'Item successfully deleted', data: newData }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}
