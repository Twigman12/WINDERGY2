# Interactive Wind Energy Explorer

An interactive 3D wind turbine analysis platform built with React, Three.js, and modern web technologies. This application provides a comprehensive dashboard for analyzing wind energy investment opportunities with interactive 3D visualization and AI-powered insights.

## Features

### 🎯 Interactive 3D Hero Page
- **Interactive Wind Turbine Schematic**: Built with Three.js and professional blueprint wireframe style
- **Clickable Components**: Click on turbine blades, nacelle, and tower to learn about wind energy
- **Raycasting**: Advanced mouse interaction with 3D objects
- **AI-Powered Insights**: Generate explanations and fun facts about wind energy

### 📊 Project Dashboard
- **Project Cards**: Color-coded gauges for Strategic Fit Score and TRL
- **Statistics Overview**: Key metrics and investment summaries
- **Search Functionality**: Real-time project filtering
- **Advanced Filters**: Range sliders for scores and dropdown filters

### 🔍 Detailed Project Analysis
- **Tabbed Interface**: Overview, Investment, and Competition tabs
- **Investment Analysis**: ROI calculations and timeline projections
- **Competitive Analysis**: Market position and competitor insights
- **Responsive Design**: Works seamlessly on all devices

### 🎨 Modern UI/UX
- **Parallax Scrolling**: Smooth section transitions
- **Glass Morphism**: Modern backdrop blur effects
- **Color-coded Metrics**: Visual score indicators
- **Responsive Layout**: Mobile-first design approach

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: React Spring
- **Styling**: CSS3 with modern features (Grid, Flexbox, Custom Properties)
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WindEnergy_2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/
│   ├── HeroSection.tsx          # 3D wind turbine hero section
│   ├── DashboardSection.tsx     # Project dashboard with filters
│   ├── ProjectDetailsSection.tsx # Detailed project analysis
│   ├── Navigation.tsx           # Main navigation component
│   ├── ProjectCard.tsx          # Individual project cards
│   ├── SearchBar.tsx            # Search functionality
│   ├── FilterSidebar.tsx        # Advanced filtering options
│   └── *.css                    # Component-specific styles
├── App.tsx                      # Main application component
├── index.tsx                    # Application entry point
└── index.css                    # Global styles
```

## Key Components

### HeroSection
- Interactive 3D wind turbine schematic using Three.js
- Clickable components with raycasting and hover effects
- AI-powered explanations and fun facts
- Professional blueprint wireframe aesthetic

### DashboardSection
- Grid layout for project cards
- Real-time search and filtering
- Statistics overview with animated cards
- Collapsible filter sidebar

### ProjectDetailsSection
- Tabbed interface for detailed analysis
- Investment metrics and ROI calculations
- Competitive analysis with market insights
- Responsive tab navigation

## Customization

### Adding New Projects
Edit the `mockProjects` array in `src/App.tsx`:

```typescript
const mockProjects: Project[] = [
  {
    id: 'unique-id',
    name: 'Project Name',
    strategicFitScore: 85,
    trl: 7,
    fundingStage: 'Series B',
    technologyType: 'Solar Energy',
    description: 'Project description...',
    investment: {
      required: 25000000,
      potential: 150000000,
      timeline: '3-5 years'
    },
    competition: {
      competitors: ['Competitor 1', 'Competitor 2'],
      marketPosition: 'Market Position',
      advantages: ['Advantage 1', 'Advantage 2']
    }
  }
];
```

### Styling Customization
- Modify color schemes in CSS custom properties
- Update gradients and animations in component CSS files
- Adjust responsive breakpoints as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Lazy loading for 3D components
- Optimized Three.js geometries
- Efficient React rendering with useMemo
- CSS animations for smooth interactions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js community for 3D graphics capabilities
- React Three Fiber for React integration
- React Spring for smooth animations
- Modern CSS features for beautiful UI design
