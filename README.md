# Pink Pin Merchant App

A Progressive Web Application (PWA) for logistics and delivery merchants to manage orders efficiently with map-based location selection and real-time distance/shipping fee calculations.

## Project Setup

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
npm run start
```

### Testing

```bash
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
```

### Linting and Formatting

```bash
npm run lint          # Check for linting errors
npm run format        # Format code with Prettier
```

## Project Structure

```
src/
├── components/        # React components
│   └── form-sections/ # Form section components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── page-components/   # Page-level components
├── providers/         # Context providers
├── services/          # Business logic and services
│   └── storage/       # Storage adapter pattern
├── stores/            # Zustand stores
├── types/             # TypeScript type definitions
└── utils/             # Utility functions

app/                   # Next.js App Router pages
├── create-order/      # Order creation page
├── dashboard/         # Dashboard page
├── login/             # Login page
└── orders/            # Orders pages
```

## Key Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Next.js 15** - Full-stack React framework
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Tailwind CSS** - Styling
- **Google Maps API** - Map integration
- **Vitest** - Testing framework
- **fast-check** - Property-based testing

## Features

- Mobile-first responsive design
- Map-based order creation with distance calculation
- Real-time shipping fee calculation
- Order history with filtering and sorting
- Dashboard with KPIs and analytics
- Offline support via PWA
- Storage adapter pattern for flexible data persistence

## Demo Credentials

- Email: `demo@pinkpin.com`
- Password: `demo123`

## Development Notes

- Sample data is automatically initialized on first app load
- All data is stored in localStorage (can be switched to API via storage adapter)
- The app uses TanStack Query for server state and Zustand for UI state
- Tailwind CSS is configured with custom colors for the Pink Pin brand