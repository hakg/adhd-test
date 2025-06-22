# ADHD Assessment Application

## Overview

This is a Korean-language ADHD (Attention Deficit Hyperactivity Disorder) self-assessment web application built with React (frontend) and Express.js (backend). The application allows users to complete an 18-question assessment and receive detailed results categorizing their symptoms into inattention, hyperactivity, and impulsivity scores.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom medical-themed color palette
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: tsx for TypeScript execution in development

### Database Schema
- **Assessments Table**: Stores completed assessments with JSON answers and calculated scores
- **Users Table**: Basic user management (currently minimal implementation)
- Uses Drizzle ORM with PostgreSQL dialect for type-safe database operations

## Key Components

### Frontend Components
1. **Welcome Page**: Landing page with assessment instructions and disclaimers
2. **Assessment Page**: Multi-step questionnaire with progress tracking
3. **Results Page**: Detailed score breakdown and interpretation
4. **Question Components**: Reusable question cards with radio button selections
5. **Progress Bar**: Visual progress indicator for assessment completion

### Backend Services
1. **Storage Layer**: Abstract storage interface with in-memory implementation for development
2. **Assessment Routes**: REST API endpoints for creating and retrieving assessments
3. **Validation**: Zod schema validation for incoming assessment data

### Shared Schema
- Type-safe schema definitions using Drizzle ORM
- Zod validation schemas for runtime type checking
- TypeScript types exported for frontend consumption

## Data Flow

1. **Assessment Creation**: User completes 18-question assessment on frontend
2. **Score Calculation**: Frontend calculates inattention, hyperactivity, and impulsivity scores
3. **Data Submission**: Assessment data sent to backend via REST API
4. **Storage**: Assessment stored in PostgreSQL database with timestamps
5. **Results Display**: Calculated scores and interpretation shown to user
6. **Data Retrieval**: Previous assessments can be retrieved via API endpoints

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Development Environment
- Uses Replit with Node.js 20, PostgreSQL 16 modules
- Vite dev server on port 5000
- Hot module replacement for frontend development
- tsx for backend TypeScript execution

### Production Build
- Frontend: Vite builds static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployment target serving both frontend and backend
- Environment variable configuration for database connection

### Database Management
- Drizzle Kit for schema migrations
- `npm run db:push` command for schema deployment
- Automatic database provisioning check via environment variables

## Features

### Core Features
- 18-question Korean ADHD assessment questionnaire
- Real-time progress tracking during assessment
- Comprehensive scoring system (inattention, hyperactivity, impulsivity)
- 4-tier risk level interpretation (normal to high-risk)
- Medical disclaimer and professional consultation guidance
- Assessment result storage and retrieval

### User Interface Features
- Clean, medical-themed design with accessible color palette
- Responsive design for mobile and desktop
- Progress bar with visual feedback
- Radio button selections with hover states
- Print functionality for results
- Social sharing capabilities (KakaoTalk integration)

### Technical Features
- TypeScript for type safety
- React Query for server state management
- In-memory storage for development
- RESTful API endpoints
- Session management ready
- Hot module replacement in development

## Local Development Setup

This project can be run locally on any machine with Node.js. Here's how:

### Prerequisites
- Node.js 20 or higher
- npm (comes with Node.js)

### Installation & Setup
1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5000`

### Project Structure for Local Development
- Frontend: React with Vite (client/src/)
- Backend: Express.js with TypeScript (server/)
- Shared types: TypeScript schemas (shared/)
- Development: Uses tsx for TypeScript execution
- Build: Vite for frontend, esbuild for backend

### IDE Compatibility
The project works with any modern IDE/editor:
- VS Code (recommended - includes TypeScript support)
- WebStorm
- Sublime Text
- Vim/Neovim with TypeScript plugins
- Any editor with TypeScript language server support

All necessary configuration files (tsconfig.json, package.json, etc.) are included for seamless local development.

## Changelog

```
Changelog:
- June 22, 2025. Initial ADHD assessment application setup
- June 22, 2025. Added KakaoTalk sharing functionality for test results
- June 22, 2025. Added comprehensive local development documentation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Features requested: KakaoTalk sharing functionality for test results.
Technical interest: Local development environment setup and IDE compatibility.
Storage preference: In-memory storage for one-time use (no persistent database needed).
```