### EloRise Boosting Site
A professional League of Legends boosting service interface built as a single-page React application with modern UI/UX design.


## Project Overview
EloRise Boosting Site provides a sleek, user-friendly interface for League of Legends players to purchase various types of ranked boosting services. The application features three main service categories with dynamic pricing, real-time calculations, and responsive design.

## Features
Core Services
Division Boost: Complete rank promotions through divisions and tiers with sophisticated pricing based on current rank, desired rank, and division differences

Wins/Games Boost: Purchase individual wins with tier-based pricing that scales according to rank, LP range, and LP per win performance

Placements Boost: Complete placement matches with options for different game counts and previous season rank consideration

## Key Functionalities
Real-time price calculation based on selected parameters

Dynamic validation preventing users from selecting lower ranks than their current rank

Sophisticated pricing models with tier-based multipliers

Volume discounts for multiple wins/divisions

Duo queue pricing options

Server selection with global region support

Loyalty points system with tier-based bonuses

Responsive design optimized for desktop and mobile devices

## Technical Implementation
React-based component architecture with state management

Vite for fast development and building

Modern CSS with gradient backgrounds and glassmorphism effects

Dynamic pricing algorithms for each service type

Form validation and user-friendly error handling

Modular component structure for easy maintenance

## Prerequisites
Node.js 16+

npm or yarn package manager


## Project Structure (Have to Update)

elorise-boosting-site/
├── src/
│   ├── components/
│   │   ├── DivisionBoost.jsx
│   │   ├── WinsGamesBoost.jsx
│   │   └── PlacementsBoost.jsx
│   ├── styles/
│   │   ├── DivisionBoost.css
│   │   ├── WinsGamesBoost.css
│   │   └── PlacementsBoost.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md


# Future Enhancements
Potential improvements for future versions:

User authentication and account management

Order history and tracking

Booster selection interface

Payment gateway integration

Admin dashboard for order management

Enhanced mobile experience

Additional game support beyond League of Legends
