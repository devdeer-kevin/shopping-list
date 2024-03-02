'use client'

import { useState, useEffect, ReactElement, ChangeEvent, KeyboardEvent, MouseEvent, Key } from 'react'

/**
 * Shopping List Component
 *
 * This component shows a list of items that the user has added to their shopping
 *
 * @returns {ReactElement} The Shopping List Component
 */
export default function ShoppingListComponent(): ReactElement {
    // State to hold the shopping list array
    const [itemsArray, setItemsArray] = useState([] as string[])
    // State to hold the input value
    const [inputValue, setInputValue] = useState('')
    // State to hold the invalid input
    const [invalidInput, setInvalidInput] = useState(false)

    // Method to get the items from the URL and set them in the state when the component mounts
    useEffect(() => {
        // Log every item in the URL
        const urlParams = new URLSearchParams(window.location.search)
        // Get the items from the URL
        const itemsParam = urlParams.get('items')
        // Log the items
        const itemsArray = itemsParam ? itemsParam.split(',') : []

        setItemsArray([...itemsArray])
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
        updateURL([...itemsArray, inputValue])
    }

    // Method to update the URL with the inputValue
    const updateURL = (urlItems: string[]) => {
        // Update the URL with the items
        const url = new URL(window.location.href)
        // Set the items in the URL
        url.searchParams.set('items', urlItems.join(','))
        // Replace the URL
        window.history.replaceState(null, '', url.toString())
        // Log every item in the URL
        const urlParams = new URLSearchParams(window.location.search)
        // Get the items from the URL
        const itemsParam = urlParams.get('items')
        // Log the items
        const itemsParamArray = itemsParam ? itemsParam.split(',') : []

        setItemsArray([...itemsParamArray])
    }

    // Method to add item to the shopping list array
    const addItem = () => {
        // Check if the item already exists in the list
        if (!isInputValid() && inputValue.trim()) {
            saveItems(inputValue)
            setInputValue('')
            setInvalidInput(false)
        }
    }

    // Method to handle key down event
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // Check if the item already exists in the list
        if (event.key === 'Enter') {
            if (!isInputValid() && inputValue.trim()) {
                saveItems(inputValue)
                setInputValue('')
                setInvalidInput(false)
            }
        }
    }

    // Method to remove item from the shopping list array by button click
    const removeItem = (event: MouseEvent<HTMLButtonElement>) => {
        const index = itemsArray.indexOf(event.currentTarget.previousElementSibling?.getAttribute('placeholder')!)
        itemsArray.splice(index, 1)
        setItemsArray([...itemsArray])
        // setUrlItems([...itemsArray])
        updateURL([...itemsArray])
    }

    return (
        <div className="flex flex-col gap-3 mx-auto justify-between">
            <h2 className="text-3xl font-bold text-left">Shopping List</h2>
            <div className="border-2 w-full border-orange-400"></div>
            <div className="grid gap-2 w-full">
                <div className="grid grid-flow-col gap-2">
                    <input
                        className="border-2 border-blue-950 bg-transparent p-2 rounded-lg text-blue-950 placeholder:text-blue-950"
                        placeholder="Add Shopping Item"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setInvalidInput(false)}
                    />
                    <button onClick={addItem} className="text-blue-950 border-2 border-blue-950 p-2 rounded-lg w-10">
                        +
                    </button>
                </div>
                {invalidInput && (
                    <div className="bg-pink-500 text-center p-1 rounded-full text-sm font-bold text-pink-100">
                        <div>
                            <p>Ups, you already got this on your list.</p>
                        </div>
                    </div>
                )}
                {itemsArray.map((shoppingItem: string, i: Key | null | undefined) => (
                    <div key={i} className="grid grid-flow-col gap-2">
                        <input
                            disabled
                            className="border-2 border-blue-950 bg-blue-950 p-2 rounded-lg text-slate-50 placeholder:text-slate-50 font-bold"
                            type="text"
                            placeholder={shoppingItem}
                        />
                        <button onClick={removeItem} className="text-slate-50 border-2 border-blue-950 bg-blue-950 p-2 rounded-lg w-10">
                            -
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
