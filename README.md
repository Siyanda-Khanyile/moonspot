# Moonspot - Music Artist Booking Platform

[![CI/CD Pipeline](https://github.com/Siyanda-Khanyile/moonspot/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Siyanda-Khanyile/moonspot/actions/workflows/ci-cd.yml)
[![Deploy to Staging](https://github.com/Siyanda-Khanyile/moonspot/actions/workflows/deploy-staging.yml/badge.svg)](https://github.com/Siyanda-Khanyile/moonspot/actions/workflows/deploy-staging.yml)

A modern React/TypeScript web application that connects event organizers with musical artists for bookings. Built with Vite, Tailwind CSS, and shadcn/ui components.

## 🚀 Live Demo

- **Production**: [https://siyanda-khanyile.github.io/moonspot](https://siyanda-khanyile.github.io/moonspot)
- **Staging**: [https://siyanda-khanyile.github.io/moonspot-staging](https://siyanda-khanyile.github.io/moonspot-staging)

## ✨ Features

- **Multi-role authentication** (organizers vs admins)
- **Artist discovery** with genre filtering and search
- **Booking workflow** from request to completion
- **Real-time messaging** between parties
- **Mobile-responsive design** with bottom navigation
- **Rich artist profiles** with verification badges and social media integration

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 🏗️ Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Siyanda-Khanyile/moonspot.git
   cd moonspot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run ci` - Run full CI pipeline locally
- `npm run clean` - Clean build artifacts

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on push to `main` and `develop` branches
   - Installs dependencies, runs linting, type checking, and builds
   - Deploys to GitHub Pages on successful main branch builds

2. **Pull Request Checks** (`.github/workflows/pr-checks.yml`)
   - Runs quality checks on all pull requests
   - Includes security audits and bundle size reporting

3. **Staging Deployment** (`.github/workflows/deploy-staging.yml`)
   - Deploys develop branch to staging environment

4. **Dependency Updates** (`.github/workflows/dependency-update.yml`)
   - Automated weekly dependency updates
   - Creates pull requests for review

### Deployment

- **Production**: Automatically deployed to GitHub Pages on push to `main`
- **Staging**: Automatically deployed on push to `develop` branch
- **Preview**: Pull request previews available via GitHub Pages

### Environment Variables

For production deployments, you may need to set:

```bash
NODE_ENV=production
VITE_APP_ENV=production
```

## 📁 Project Structure

```
moonspot/
├── .github/workflows/     # GitHub Actions workflows
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── artist/       # Artist-specific components
│   │   ├── booking/      # Booking-related components
│   │   ├── chat/         # Chat/messaging components
│   │   ├── common/       # Common components
│   │   └── navigation/   # Navigation components
│   ├── contexts/         # React contexts
│   ├── data/            # Mock data and constants
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin portal pages
│   │   ├── auth/        # Authentication pages
│   │   └── organiser/   # Organizer portal pages
│   ├── types/           # TypeScript type definitions
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── dist/               # Production build output
```

## 🎨 Design System

The application uses a consistent design system built with:

- **Colors**: Custom purple/dark theme (`#1A1040` primary)
- **Typography**: System fonts with Tailwind CSS typography
- **Components**: shadcn/ui component library
- **Icons**: Lucide React icon set
- **Responsive**: Mobile-first responsive design

## 🔐 Authentication

Demo credentials for testing:

- **Admin**: `admin@moonspot.com`
- **Organizer**: `organiser@demo.com`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

- ESLint configuration for code quality
- TypeScript for type safety
- Prettier for code formatting (recommended)
- Husky for git hooks (optional)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for the build tool
