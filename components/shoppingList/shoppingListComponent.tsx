'use client'

import useItemsStore from '../../store/store'
import { useState, useEffect, ReactElement, ChangeEvent, KeyboardEvent, MouseEvent, Key } from 'react'

/**
 * Shopping List Component
 *
 * This component shows a list of items that the user has added to their shopping
 *
 * @returns {ReactElement} The Shopping List Component
 */
export default function ShoppingListComponent(): ReactElement {
    // Use the global items store
    const store = useItemsStore()
    // State to hold the shopping list array
    const [itemsArray, setItemsArray] = useState([] as string[])
    // State to hold the input value
    const [inputValue, setInputValue] = useState('')
    // State to hold the invalid input
    const [invalidInput, setInvalidInput] = useState(false)
    // State of loading
    const [loading, setLoading] = useState(false)

    // Method to fetch the API
    const fetchAPI = async () => {
        setLoading(true)
        const response = await fetch('/api/v1/items', {
            method: 'GET',
        })
        const data = await response.json()
        const fetchedItems = data.items.map((item: any) => item.name)
        setItemsArray(fetchedItems)
        store.items = await fetchedItems.map((item: string) => ({ name: item }))
        setLoading(false)
    }

    // Method to post to the API
    //TODO: Save the item to the API when they originate from the URL
    const postToAPI = async (data: string) => {
        setLoading(true)
        await fetch('/api/v1/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data }),
        })
        setLoading(false)
    }

    // Method to delete from the API
    const deleteFromAPI = async (data: string) => {
        setLoading(true)
        fetch('/api/v1/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data }),
        })
        store.removeItem(data)
        setLoading(false)
    }

    // Method to get the items from the URL and set them in the state
    const fetchURL = async () => {
        // Get the items from the URL and set them in an array
        let urlParams = new URLSearchParams(window.location.search).getAll('items').join(',').split(',')
        // Filter the empty strings from the array
        urlParams = urlParams.filter((item) => item !== '')
        // Convert the urlParams array of strings to an array of Item objects
        const items = urlParams.map((item: string) => ({ name: item }))
        // Set the items with the items from the URL
        setItemsArray([...urlParams])
        // Set the items in the store
        store.items = items
        // Condition to check if the URL has items
        if (urlParams.length === 0) {
            // If the URL has no items, fetch the items from the API
            fetchAPI()
        }
    }

    // Method to get the items from the URL and set them in the state when the component mounts
    useEffect(() => {
        // Fetch the items from the URL
        fetchURL()
    }, [])

    // Method to handle input change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        setInvalidInput(false)
    }

    // Method to check if the input is valid
    const isInputValid = () => {
        if (itemsArray.some((item) => item === inputValue)) {
            setInvalidInput(true)
            setInputValue('')
            return true
        }
        return false
    }

    // Method to save the items by updating the state and the URL
    const saveItems = (inputValue: string) => {
        setItemsArray([...itemsArray, inputValue])
        postToAPI(inputValue)
        updateURL([...itemsArray, inputValue])
    }

    // Method to update the URL with the inputValue
    const updateURL = (urlItems: string[]) => {
        // Get the URL with the current items
        const url = new URL(window.location.href)
        // Set the items in the URL
        url.searchParams.set('items', urlItems.join(','))
        // Replace the URL
        window.history.replaceState(null, '', url.toString())
        // Set items from the URL in the state
        fetchURL()
    }

    // Method to add item to the shopping list array
    const addItem = () => {
        // Check if the item already exists in the list
        if (!isInputValid() && inputValue.trim()) {
            // Save the items
            saveItems(inputValue)
            setInputValue('')
            setInvalidInput(false)
        }
    }

    // Method to handle key down event
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // Check if the item already exists in the list
        if (event.key === 'Enter' || event.key === 'NumpadEnter') {
            if (!isInputValid() && inputValue.trim()) {
                // Save the items
                saveItems(inputValue)
                setInputValue('')
                setInvalidInput(false)
            }
        }
    }

    // Method to remove item from the shopping list array by button click
    const removeItem = (event: MouseEvent<HTMLButtonElement>) => {
        // Remove the item from the array
        const index = itemsArray.indexOf(event.currentTarget.previousElementSibling?.getAttribute('placeholder')!)
        // Remove the item from the array
        itemsArray.splice(index, 1)
        // Set the items in the state
        setItemsArray([...itemsArray])
        // Delete the item from the API
        deleteFromAPI(event.currentTarget.previousElementSibling?.getAttribute('placeholder')!)
        // Update the URL
        updateURL([...itemsArray])
    }

    return (
        <div>
            <div className="flex sm:flex-row flex-col sm:gap-6 gap-2">
                <div className="flex flex-col gap-2 sm:border-r-2 border-r-0 sm:px-4 px-0 sm:pt-0 pt-4 w-full border-slate-500">
                    <div className="grid gap-2 w-full">
                        <div className="grid grid-flow-col gap-2 font-mono">
                            <input
                                className="border-2 border-yellow-500 bg-transparent p-2 rounded-lg text-yellow-500 placeholder:text-yellow-500"
                                placeholder="Add Shopping Item"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setInvalidInput(false)}
                            />
                            <button onClick={addItem} className="text-yellow-500 border-2 border-yellow-500 p-2 rounded-lg w-10">
                                +
                            </button>
                        </div>
                        {invalidInput && (
                            <div className="bg-pink-500 text-center p-1 rounded-full text-sm font-bold text-pink-100 font-mono">
                                <div>
                                    <p>This item already exists.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-flow-row gap-2 font-mono">
                    {loading && <div className="grid grid-flow-col gap-3 animate-spin text-4xl h-9 w-9">🌀</div>}
                    {itemsArray.map((shoppingItem: string, i: Key | null | undefined) => (
                        <div key={i} className="grid grid-flow-col gap-3">
                            <input
                                disabled
                                className="border-2 border-blue-700 bg-blue-700 p-2 rounded-lg text-slate-950 placeholder:text-slate-950 font-bold"
                                type="text"
                                placeholder={shoppingItem}
                            />
                            <button onClick={removeItem} className="text-slate-950 border-2 border-blue-700 bg-blue-700 p-2 rounded-lg w-10">
                                -
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
