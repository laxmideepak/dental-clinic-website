# Overview

This is a full-stack web application built for Jefferson Dental & Orthodontics, featuring a promotional landing page for back-to-school dental savings. The application showcases dental services with interactive components including countdown timers, testimonial carousels, and promotional offers. It's built as a modern React SPA with Express backend support and is designed to drive appointment bookings through compelling CTAs and promotional content.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool and development server
- **Styling**: Tailwind CSS with a comprehensive design system using CSS custom properties for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility and consistency
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management with custom query client configuration
- **Form Handling**: React Hook Form with Zod schema validation through @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Development**: tsx for TypeScript execution and hot reloading
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) and interface for future database integration
- **Build System**: esbuild for production builds with platform-specific bundling

## Database & ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Centralized schema definitions in shared directory with Zod integration for type-safe validation
- **Migrations**: Drizzle Kit for database schema migrations and management

## Development & Tooling
- **Monorepo Structure**: Organized with client, server, and shared directories for code separation
- **Path Aliases**: Configured TypeScript path mapping for clean imports (@/, @shared/)
- **Development Experience**: Replit-specific plugins for error handling and development cartographer
- **Code Quality**: TypeScript strict mode enabled with comprehensive type checking

## External Dependencies

### Core Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing solution
- **class-variance-authority & clsx**: Utility-first styling with conditional classes
- **date-fns**: Date manipulation and formatting
- **embla-carousel-react**: Touch-friendly carousel components

### UI Component System
- **@radix-ui/***: Comprehensive set of accessible, unstyled UI primitives including dialogs, dropdowns, navigation, form controls, and overlays
- **lucide-react**: Consistent icon library
- **cmdk**: Command palette and search interface components

### Backend & Database
- **drizzle-orm & drizzle-zod**: Type-safe ORM with automatic schema validation
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in development
- **@replit/vite-plugin-cartographer**: Development experience enhancements for Replit environment
- **tsx**: TypeScript execution for development workflow