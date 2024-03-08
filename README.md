# Shopping List Application

This repository contains a NextJS application for a simple shopping list. The app allows users to add items to a shopping list, check for duplicate entries, and remove items from the list. It showcases basic React state management, event handling, and conditional rendering.

## Features

-   **Dynamic Shopping List Management:** Allows users to dynamically add, display, and remove items from their shopping list.
-   **API Integration:** Fetches existing items from an API on initial load and supports adding or deleting items through API requests.
-   **Persistent URL Updates:** Updates the URL with current shopping list items for easy sharing and bookmarking.
-   **Input Validation:** Checks for duplicate items and prevents them from being added to the list, ensuring each item is unique.
-   **Interactive User Interface:** Offers an intuitive interface with input fields and buttons for shopping list management.
-   **Clipboard Support:** Includes a feature to copy the current URL (with the shopping list) to the clipboard for easy sharing.
-   **Loading State Indication:** Displays a loading indicator while fetching data from the API or during add/delete operations.
-   **Accessibility Features:** Ensures accessibility through keyboard navigation and focus management.
-   **Responsive Design:** Adapts to different screen sizes for a consistent user experience across devices.
-   **Visual Feedback:** Provides immediate visual feedback on actions such as copying the URL or detecting duplicate items.
-   **State Management:** Utilizes React hooks for efficient state management and updates throughout the component lifecycle.
-   **Efficient URL Parameter Handling:** Parses and updates URL parameters to reflect the current state of the shopping list, allowing for direct navigation to a pre-populated list.

## Local Development

To use the Shopping List application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/[yourgithubusername]/shopping-list.git
```

2. Navigate to the directory:

```bash
cd hy.com
```

3. Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

4. Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

This will launch the website on `localhost:3000` (or a different port if specified).
