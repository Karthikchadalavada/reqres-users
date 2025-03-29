# React User Management App

## Description
This is a React application that integrates with the [Reqres API](https://reqres.in/) to perform basic user management functions, including login, fetching users with pagination, editing, deleting users, searching users, and logout functionality.

## Features
- **User Authentication**: Login using Reqres API. On successful login, a toast message appears, and after 2 seconds, the user is redirected to the home page.
- **User List Fetching**: A button on the home page fetches and displays the user list from the API.
- **Pagination**: Users can navigate between pages using Next and Previous buttons.
- **User Cards**: Each user is displayed as a card containing an avatar, first name, last name, email, edit button, and delete button.
- **Edit User**: Clicking the edit button opens a prefilled form to update user details, which are reflected in the UI.
- **Delete User**: Clicking the delete button removes the user from the list.
- **Search Users**: A search bar filters users based on the entered name.
- **Logout**: A logout button logs out the user and redirects them to the login page.

## Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Start the Application**
   ```bash
   npm start
   ```

## API Endpoints Used
- **Login**: `POST https://reqres.in/api/login`
- **Get Users**: `GET https://reqres.in/api/users?page=1`
- **Edit User**: `PUT https://reqres.in/api/users/{id}`
- **Delete User**: `DELETE https://reqres.in/api/users/{id}`

## Technologies Used
- React
- React Toastify (for notifications)
- Fetch (for API requests)

## Assumptions and Considerations
- The application is built using React functional components and hooks.
- Users are fetched from Reqres API, and modifications are simulated on the frontend (since Reqres is a mock API and doesn't persist changes).
- The user session is managed using local storage.

## License
This project is open-source and available under the MIT License.

