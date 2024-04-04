'use client'

import { useState, useEffect, ReactElement, Key } from 'react'

/**
 * Shopping List Component
 *
 * This component shows a list of items that the user has added to their shopping
 *
 * @returns {ReactElement} The Shopping List Component
 */
export default function NavigationComponent(): ReactElement {
    // State to hold the shopping list array
    const [itemsArray, setItemsArray] = useState([] as string[])
    // State if the share button is clicked
    const [clickShare, setClickShare] = useState(false)
    // State of loading
    const [showCart, setShowCart] = useState(false)

    // Method to get the items from the URL and set them in the state
    const fetchURL = async () => {
        // Get the items from the URL and set them in an array
        const urlParams = new URLSearchParams(window.location.search).getAll('items').join(',').split(',')
        // Set the items with the items from the URL
        setItemsArray([...urlParams])
    }

    // Method to get the items from the URL and set them in the state when the component mounts
    useEffect(() => {
        // Get the items from the URL and set them in the state
        fetchURL()
    }, [])

    // Method to copy the URL to the clipboard
    const copyURLToClipboard = () => {
        const url = window.location.href
        navigator.clipboard
            .writeText(url)
            .then(() => {
                setClickShare(true)
            })
            .catch((error) => {
                console.error('Failed to copy URL to clipboard:', error)
            })
    }

    return (
        <div>
            <div className="sm:py-6 py-4 px-8 flex flex-row  sm:gap-4 gap-2 items-ends justify-between items-baseline">
                <div>
                    <h2 className="sm:text-3xl text-2xl text-red-400 sm:text-left font-mono font-thin">Shopping List</h2>
                </div>
                <div className="flex flex-row gap-4">
                    <button onClick={copyURLToClipboard} className="text-slate-950 bg-red-400 py-2 px-4 rounded-lg text-sm">
                        {clickShare ? '✅ URL copied' : '🔗 Copy URL'}
                    </button>
                    <button onClick={() => setShowCart(!showCart)} className="text-slate-950 bg-slate-50 py-2 px-4 rounded-lg text-sm">
                        🛒 Cart
                    </button>
                </div>
            </div>
            {showCart && (
                <div className="absolute max-w-44 right-8 bg-slate-50 rounded-lg shadow-xl">
                    <div className="border-b border-slate-300">
                        <h3 className="text-slate-950 py-2 px-4 text-sm font-bold font-mono">Shopping Items</h3>
                    </div>
                    <ul>
                        {itemsArray.map((shoppingItem: string, i: Key | null | undefined) => (
                            <li key={i} className="text-slate-950 py-2 px-4 text-sm font-mono">
                                {shoppingItem}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
