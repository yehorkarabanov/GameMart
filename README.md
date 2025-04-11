# GameMart

GameMart is a platform for video game enthusiasts to explore, review, and manage their favorite games. This repository contains the codebase for the GameMart application, developed using JavaScript, Python (Django and Django Rest Framework), SCSS, and HTML.

## Features
- **Game Browsing**: Discover popular, trending, and classic games.
- **User Reviews**: Share and read reviews from other gamers.
- **Game Management**: Keep track of your personal game library.
- **Responsive Design**: Optimized for various devices using SCSS.
- **Dynamic Backend**: Built with Django and Django Rest Framework (DRF) to handle data and API interactions.
- **Interactive Frontend**: Built with React to deliver a seamless user experience.

## Backend Features
The backend is implemented using Django and Django Rest Framework (DRF) and includes the following key features:

1. **Django Framework**:
   - Built using Django with DRF for creating APIs and managing backend logic.

2. **Custom User Management**:
   - A `CustomUser` model with email-based authentication.
   - Includes custom user creation and change forms.

3. **Cart Functionality**:
   - The `cart` app manages user carts, allowing users to add games and monitor their details.
   - Unique constraints ensure that each user can only have one cart entry per game.

4. **Like System**:
   - A `like` app allows users to like games.
   - Provides endpoints for listing, creating, and deleting likes with proper authentication.

5. **JWT Authentication**:
   - Implements JSON Web Token (JWT) authentication with customizable token lifetimes.
   - Configured using `rest_framework_simplejwt`.

6. **CORS Support**:
   - Configured to allow requests from `http://localhost:3000` for frontend integration.

7. **Database**:
   - Uses SQLite as the default database engine.

8. **Static and Media Files Handling**:
   - Static files (`static/`) and media files (`media/`) are served using Django's file handling configurations.

9. **Security Configurations**:
   - Includes settings for authentication, CSRF protection, and other security-related configurations.

## Frontend Features
The frontend is implemented using React and includes the following key features:

1. **React Framework**:
   - The frontend is built using React, utilizing functional components and React Router for single-page application (SPA) routing.

2. **Routing**:
   - The `App.js` file defines routes for key pages such as:
     - Home (`/`)
     - Account (`/account/`)
     - Like (`/like/`)
     - Cart (`/cart/`)
     - Product Details (`/product/:game_slug/`)

3. **State Management**:
   - State is managed using Redux Toolkit, with persistent state handling through `redux-persist`.

4. **API Communication**:
   - Axios is used for making API requests, with a custom configuration for base URL and authentication token handling.

5. **Styling**:
   - SCSS is used for modular and responsive styling, with a focus on mobile-friendly navigation.

6. **Bootstrap Integration**:
   - Bootstrap is included for responsive UI components, along with supplementary libraries like `react-bootstrap` and `bootstrap-icons`.

7. **Component-Based Architecture**:
   - The application is divided into reusable components, such as `Header`, `Footer`, `CartList`, and `GameDetailBlock`.

8. **Centralized API Store**:
   - The `productSlice.js` file in the Redux store manages product-related API calls and caching, including:
     - Fetching products.
     - Fetching individual product details.
     - Caching product data with expiration logic.

9. **Form Handling**:
   - Form validation and handling is done using Formik and Yup.

10. **Project Bootstrapping**:
    - The project is initialized with Create React App, providing a streamlined development and build process.

## Tech Stack
- **Frontend**: JavaScript, SCSS, HTML (React, Redux, Axios)
- **Backend**: Python (Django, DRF)
- **Version Control**: Git and GitHub

## Folder Structure
```
- `frontend/`: Contains the client-side code.
- `backend/`: Contains the server-side code and APIs built with Django and DRF.
- `assets/`: Static resources like images and stylesheets.
- `tests/`: Unit and integration tests.
```

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Git](https://git-scm.com/)
- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yehorkarabanov/GameMart.git
   cd GameMart
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

### Running the Application
1. Start the backend server:
   ```bash
   python manage.py runserver
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints
The backend provides RESTful API endpoints for interacting with the platform's data. For detailed API documentation, refer to the `backend/README.md` or visit `/api/docs` when the server is running.

## Contributing
Contributions are welcome! Please follow the steps below:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request to the `main` branch.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any inquiries or support, feel free to reach out to [Yehor Karabanov](https://github.com/yehorkarabanov).
