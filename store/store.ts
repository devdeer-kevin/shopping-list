import { create } from 'zustand'

// Zustand implementation

export interface Item {
    name: string
}

/**
 * Items store type
 */
type ItemsStore = {
    items: Item[]
    newItem: string
    addItem: () => void
    setNewItem: (item: string) => void
    removeItem: (item: string) => void
}

/**
 * Create the items store
 */
const useItemsStore = create<ItemsStore>((set) => ({
    items: [],
    newItem: '',
    addItem: () => {
        set((state) => ({
            items: [
                ...state.items,
                {
                    name: state.newItem,
                },
            ],
            newItem: '',
        }))
    },
    setNewItem: (item: string) => {
        set((state) => ({
            ...state,
            newItem: item,
        }))
    },
    removeItem: (item: string) => {
        set((state) => ({
            items: state.items.filter((i) => i.name !== item),
        }))
    },
}))

export default useItemsStore
