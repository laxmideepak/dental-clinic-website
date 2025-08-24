# Dental Clinic Website

A modern, responsive dental clinic website built with React, TypeScript, and Express.js. Features appointment booking, promotional offers, and patient testimonials.

## 🦷 Features

- **Modern UI/UX** - Clean, professional design with Tailwind CSS
- **Appointment Booking** - Interactive booking modal for patient appointments
- **Promotional Offers** - Back-to-school savings and special deals
- **Patient Testimonials** - Carousel showcasing patient experiences
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Chat** - Customer support chat widget
- **Countdown Timer** - Limited-time offer countdowns
- **ADA Safety Information** - Accessibility and safety guidelines

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (with Drizzle ORM)
- **Build Tool**: Vite
- **UI Components**: Radix UI, Lucide React Icons
- **State Management**: React Query (TanStack Query)
- **Routing**: Wouter

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DentalClone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file with your database URL
   echo "DATABASE_URL=your_postgresql_connection_string" > .env
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run check` - TypeScript type checking

## 🌐 Deployment

### Local Development
```bash
export PORT=3000
export DATABASE_URL="sqlite:./local.db"
npm run dev
```

### Production Deployment
1. Set up a PostgreSQL database
2. Configure environment variables
3. Build the application: `npm run build`
4. Start the production server: `npm run start`

## 📁 Project Structure

```
DentalClone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility libraries
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── vite.ts           # Vite integration
├── shared/               # Shared code between client/server
│   └── schema.ts         # Database schema
└── migrations/           # Database migrations
```

## 🎨 Customization

### Colors
The application uses a custom color palette defined in `tailwind.config.ts`:
- Jefferson Blue: Primary brand color
- Jefferson Pink: Accent color for CTAs

### Content
Update the content in the component files:
- `client/src/components/hero-section.tsx` - Main hero content
- `client/src/components/promotional-offers.tsx` - Offers and deals
- `client/src/components/testimonials-carousel.tsx` - Patient testimonials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.
