# Shopping List Application 🛒

Built with NextJS, now features enhanced usability and interactivity, offering backend API integration for live data synchronization, unique URL generation for easy sharing, and advanced input validation to prevent duplicates. An improved user interface, responsive design, and clipboard functionality for quick URL sharing elevate the user experience. Utilizing React hooks for state management and efficient URL parameter handling.

## Features

-   **Dynamic Shopping List Management 📝**: Allows users to dynamically add, display, and remove items from their shopping list.
-   **API Integration 🔄**: Fetches existing items from an API on initial load and supports adding or deleting items through API requests.
-   **Persistent URL Updates 🔗**: Updates the URL with current shopping list items for easy sharing and bookmarking.
-   **Input Validation ❌**: Checks for duplicate items and prevents them from being added to the list, ensuring each item is unique.
-   **Interactive User Interface 🖱️**: Offers an intuitive interface with input fields and buttons for shopping list management.
-   **Clipboard Support 📋**: Includes a feature to copy the current URL (with the shopping list) to the clipboard for easy sharing.
-   **Loading State Indication ⏳**: Displays a loading indicator while fetching data from the API or during add/delete operations.
-   **Accessibility Features 🤝**: Ensures accessibility through keyboard navigation and focus management.
-   **Responsive Design 📱**: Adapts to different screen sizes for a consistent user experience across devices.
-   **Visual Feedback ✨**: Provides immediate visual feedback on actions such as copying the URL or detecting duplicate items.
-   **State Management 🛠️**: Utilizes React hooks for efficient state management and updates throughout the component lifecycle.
-   **Efficient URL Parameter Handling 🔧**: Parses and updates URL parameters to reflect the current state of the shopping list, allowing for direct navigation to a pre-populated list.

### Local Development Instructions for the Shopping List Project 🛠️

To set up your local development environment and contribute to the project, please follow these straightforward steps:

1. **Clone the Repository**: Begin by cloning the repository to your local machine using Git.

    ```
    git clone https://github.com/your-username/shopping-list.git
    ```

2. **Navigate to the Project Directory**: Change to the project's directory.

    ```
    cd shopping-list
    ```

3. **Install Dependencies**: Install the required project dependencies with your preferred package manager.

    ```
    npm install
    ```

    or

    ```
    yarn install
    ```

4. **Start the Development Server**: Kick-off the local development server to see the application in action.

    ```
    npm run dev
    ```

    or

    ```
    yarn dev
    ```

5. **Open the Project**: Your Shopping List application should now be up and running. Open your favorite browser and head over to [http://localhost:3000](http://localhost:3000).

### Note on Swagger UI React in Terminal/Console

When working with the `swagger-ui-react` package, developers might encounter the following message in their terminal or console:

```
⨯ node_modules/swagger-ui-react/swagger-ui-bundle.js (2:815852) @ File
```

This message is a **warning**, not an error. It is related to the `swagger-ui-bundle.js` file included with the `swagger-ui-react` package. Please be assured that this warning is **harmless** and does not impact the functionality of the Swagger UI in your project. It appears due to the specific way `swagger-ui-react` is packaged and integrated into the development environment.

If you see this warning, you can continue to work on your project without concerns. The Swagger UI should operate as expected, allowing you to document and test your API directly in your browser.

Should you have any further questions or require assistance, please do not hesitate to reach out.

### Feedback and Collaboration 💡

I highly value your input and strongly encourage collaboration. If you have any suggestions, ideas, or would like to contribute to the project, please feel free to reach out or submit a pull request.

Congratulations! 🎉 You are now ready to contribute to the Shopping List project. Let's make shopping fun and organized!
