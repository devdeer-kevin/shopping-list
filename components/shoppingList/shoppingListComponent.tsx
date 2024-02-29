"use client";

import React, {
  FunctionComponent,
  useState,
  useEffect,
  ReactElement,
} from "react";

/**
 * Shopping List Component
 *
 * This component shows a list of items that the user has added to their shopping
 *
 * @returns {ReactElement} The Shopping List Component
 */
export default function ShoppingListComponent() {
  // State to hold the shopping list array
  const [itemsArray, setItemsArray] = useState([] as string[]);
  // State to hold the input value
  const [inputValue, setInputValue] = useState("");
  // State to hold the invalid input
  const [invalidInput, setInvalidInput] = useState(false);

  // Method to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInvalidInput(false);
  };

  // Method to check if the input is valid
  const isInputValid = () => {
    if (itemsArray.some((item) => item === inputValue)) {
      setInvalidInput(true);
      setInputValue("");
      return true;
    }
    return false;
  };

  // Method to add item to the shopping list array
  const addItem = () => {
    // Check if the item already exists in the list
    if (!isInputValid() && inputValue.trim()) {
      setItemsArray([...itemsArray, inputValue]);
      setInputValue("");
      setInvalidInput(false);
    }
  };

  // Method to handle key down event
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the item already exists in the list
    if (event.key === "Enter") {
      if (!isInputValid() && inputValue.trim()) {
        setItemsArray([...itemsArray, inputValue]);
        setInputValue("");
        setInvalidInput(false);
      }
    }
  };

  // Method to remove item from the shopping list array by button click
  const removeItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = itemsArray.indexOf(
      event.currentTarget.previousElementSibling?.getAttribute("placeholder")!
    );
    itemsArray.splice(index, 1);
    setItemsArray([...itemsArray]);
  };

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
          <button
            onClick={addItem}
            className="text-blue-950 border-2 border-blue-950 p-2 rounded-lg w-10"
          >
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
        {itemsArray.map((shoppingItem, i) => (
          <div key={i} className="grid grid-flow-col gap-2">
            <input
              disabled
              className="border-2 border-blue-950 bg-blue-950 p-2 rounded-lg text-slate-50 placeholder:text-slate-50 font-bold"
              type="text"
              placeholder={shoppingItem}
            />
            <button
              onClick={removeItem}
              className="text-slate-50 border-2 border-blue-950 bg-blue-950 p-2 rounded-lg w-10"
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
