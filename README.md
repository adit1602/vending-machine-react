# Vending Machine React App

A modern, interactive vending machine application built with React, TypeScript, and Tailwind CSS. This application simulates a real vending machine with admin management features, transaction history, and a user-friendly interface.

![Vending Machine App](https://via.placeholder.com/800x400?text=Vending+Machine+App)

## Features

### Customer Interface

- Browse available products with stock information
- Add money in different denominations (Rp 2,000, Rp 5,000, Rp 10,000, etc.)
- Purchase products with real-time inventory updates
- View current balance and get change after purchase
- Responsive UI for various device sizes

### Admin Dashboard

- View, add, edit, and delete products
- Manage product inventory levels
- Update product pricing
- Visual confirmation for all admin actions

### Transaction History

- View all past transactions
- See transaction summary statistics
- Filter and sort transaction history
- Download transaction reports

## Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Yup validation
- **API Communication**: Fetch API with async/await
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Mock Backend**: JSON Server

## Project Structure

```
vending-machine-react/
├── public/
├── src/
│   ├── assets/           # Static assets like images
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Shadcn UI components
│   │   └── index.ts      # Barrel exports for components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── schemas/          # Validation schemas
│   ├── services/         # API service layer
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── App.tsx               # Main application component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Key Components

- **ProductCard**: Displays product information and purchase options
- **BalancePanel**: Manages user's current balance and money input
- **ProductManagementTable**: Admin interface for product management
- **TransactionTable**: Displays transaction history
- **MainLayout**: Provides consistent layout and navigation
- **ErrorBoundary**: Catches and displays errors gracefully

## Running the Project

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/adit1602/vending-machine-react.git
cd vending-machine-react
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Start the JSON server (mock backend):

```bash
npx json-server --watch db.json --port 3001
```

The application will be available at `http://localhost:5173`.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

This application is deployed on Vercel. You can view the live version at: [https://vending-machine-react.vercel.app](https://vending-machine-react.vercel.app)

## Using the Application

### Customer Mode

1. Navigate to the Home page
2. Add money using the balance panel
3. Click on a product to purchase it
4. View your transaction in the history page

### Admin Mode

1. Navigate to the Admin page
2. View all products in the management table
3. Add new products using the "Add Product" button
4. Edit or delete existing products

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Adit1602

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
- [JSON Server](https://github.com/typicode/json-server)

```

```
