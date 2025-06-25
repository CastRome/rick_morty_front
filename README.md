# Rick & Morty Characters Frontend

This project is a frontend application built with **React 18**, **GraphQL**, **React Router DOM**, and **TailwindCSS**. It displays a list of Rick & Morty characters with advanced features and a modern, responsive design.

## Features

- **Character List:** Displays characters in cards with their name, image, and species.
- **Sorting:** Sort characters by name (A-Z / Z-A).
- **Character Details:** Click a card to view detailed information, including image and the ability to mark as favorite.
- **Favorites:** Mark and unmark characters as favorites.
- **Comments:** Add comments to each character.
- **Search & Filter:** Search characters by Status, Species, and Gender.
- **Responsive Design:** Uses CSS Flexbox and CSS Grid for a fully responsive layout.
- **Modern Styling:** Styled with TailwindCSS.

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **Backend API:** You must have the corresponding backend GraphQL API running. This project expects a compatible Rick & Morty GraphQL API.

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd rick_morty_front
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure the API endpoint:**

   - Update the GraphQL endpoint in the project if needed (see `/src/graphql/queries.ts` or related config).

4. **Start the development server:**

   ```sh
   npm start
   # or
   yarn start
   ```

   The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `/src/components` — React components (CharacterList, etc.)
- `/src/graphql` — GraphQL queries and related logic
- `/src` — Main app files and styles

## Notes

- Make sure the backend GraphQL API is running and accessible.
- You may need to adjust CORS or endpoint URLs depending on your backend setup.
- For best results, use the latest version of Chrome, Firefox, or Edge.

## Technologies Used

- React 18
- React Router DOM
- GraphQL
- TailwindCSS
- CSS Flexbox & Grid
