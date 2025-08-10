import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import DashboardSection from './components/DashboardSection';
import ProjectDetailsSection from './components/ProjectDetailsSection';

interface Project {
  id: string;
  name: string;
  description: string;
  technologyType: string;
  strategicFitScore: number;
  trl: number;
  fundingStage: string;
  estimatedCost: number;
  timeline: string;
  location: string;
  status: string;
  // Additional fields for detailed view
  investment?: {
    required: number;
    committed: number;
    source: string;
  };
  competition?: {
    competitors: string[];
    advantages: string[];
  };
  risks?: string[];
  opportunities?: string[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Offshore Wind Farm Optimization',
    description: 'Advanced offshore wind farm with floating turbine technology and AI-powered optimization systems.',
    technologyType: 'Wind Energy',
    strategicFitScore: 85,
    trl: 7,
    fundingStage: 'Series B',
    estimatedCost: 150000000,
    timeline: '24 months',
    location: 'North Sea',
    status: 'Active',
    investment: {
      required: 150000000,
      committed: 75000000,
      source: 'Venture Capital'
    },
    competition: {
      competitors: ['Vestas', 'Siemens Gamesa', 'GE Renewable Energy'],
      advantages: ['Floating platform technology', 'AI optimization', 'Lower maintenance costs']
    },
    risks: ['Weather conditions', 'Regulatory changes', 'Supply chain delays'],
    opportunities: ['Growing offshore market', 'Government incentives', 'Technology advancement']
  },
  {
    id: '2',
    name: 'Solar Panel Efficiency Enhancement',
    description: 'Next-generation solar panels with perovskite technology achieving 30% efficiency.',
    technologyType: 'Solar Energy',
    strategicFitScore: 92,
    trl: 6,
    fundingStage: 'Series A',
    estimatedCost: 45000000,
    timeline: '18 months',
    location: 'California',
    status: 'Active',
    investment: {
      required: 45000000,
      committed: 20000000,
      source: 'Private Equity'
    },
    competition: {
      competitors: ['First Solar', 'SunPower', 'Canadian Solar'],
      advantages: ['Higher efficiency', 'Lower cost per watt', 'Flexible design']
    },
    risks: ['Technology scaling', 'Market competition', 'Material costs'],
    opportunities: ['Growing solar market', 'Efficiency improvements', 'Cost reduction']
  },
  {
    id: '3',
    name: 'Battery Storage Innovation',
    description: 'Advanced lithium-ion battery system with 24-hour grid storage capability.',
    technologyType: 'Battery Storage',
    strategicFitScore: 78,
    trl: 8,
    fundingStage: 'Series C',
    estimatedCost: 80000000,
    timeline: '30 months',
    location: 'Texas',
    status: 'Active',
    investment: {
      required: 80000000,
      committed: 60000000,
      source: 'Corporate Investment'
    },
    competition: {
      competitors: ['Tesla', 'LG Chem', 'Panasonic'],
      advantages: ['Longer lifespan', 'Higher capacity', 'Better safety']
    },
    risks: ['Raw material costs', 'Technology obsolescence', 'Regulatory changes'],
    opportunities: ['Grid storage demand', 'EV market growth', 'Renewable integration']
  },
  {
    id: '4',
    name: 'Hydrogen Fuel Cell Development',
    description: 'Green hydrogen production using renewable energy and advanced electrolysis.',
    technologyType: 'Hydrogen',
    strategicFitScore: 88,
    trl: 5,
    fundingStage: 'Seed',
    estimatedCost: 25000000,
    timeline: '36 months',
    location: 'Germany',
    status: 'Planning',
    investment: {
      required: 25000000,
      committed: 5000000,
      source: 'Government Grant'
    },
    competition: {
      competitors: ['Air Liquide', 'Linde', 'Nel Hydrogen'],
      advantages: ['Green hydrogen', 'Lower production cost', 'Scalable technology']
    },
    risks: ['Infrastructure requirements', 'Market adoption', 'Energy costs'],
    opportunities: ['Decarbonization goals', 'Industrial applications', 'Transportation sector']
  },
  {
    id: '5',
    name: 'Geothermal Energy Expansion',
    description: 'Enhanced geothermal systems for commercial power generation.',
    technologyType: 'Geothermal',
    strategicFitScore: 75,
    trl: 6,
    fundingStage: 'Series A',
    estimatedCost: 60000000,
    timeline: '42 months',
    location: 'Iceland',
    status: 'Active',
    investment: {
      required: 60000000,
      committed: 30000000,
      source: 'Energy Fund'
    },
    competition: {
      competitors: ['Ormat Technologies', 'Calpine', 'Enel Green Power'],
      advantages: ['Baseload power', 'Low emissions', 'Reliable operation']
    },
    risks: ['Geological uncertainty', 'High upfront costs', 'Location dependency'],
    opportunities: ['Baseload demand', 'Carbon reduction', 'Technology advancement']
  },
  {
    id: '6',
    name: 'Floating Wind Turbine Platform',
    description: 'Innovative floating platform design for deep-water wind energy generation.',
    technologyType: 'Wind Energy',
    strategicFitScore: 82,
    trl: 4,
    fundingStage: 'Pre-seed',
    estimatedCost: 35000000,
    timeline: '48 months',
    location: 'Pacific Ocean',
    status: 'Research',
    investment: {
      required: 35000000,
      committed: 10000000,
      source: 'Research Grant'
    },
    competition: {
      competitors: ['Principle Power', 'Equinor', 'Shell'],
      advantages: ['Deep water capability', 'Lower foundation costs', 'Higher wind speeds']
    },
    risks: ['Technology complexity', 'Weather conditions', 'Installation challenges'],
    opportunities: ['Deep water potential', 'Higher energy output', 'Market expansion']
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleTurbineClick = (component: string) => {
    console.log(`Clicked on ${component} component`);
    // Scroll to dashboard section
    const dashboardSection = document.querySelector('.dashboard-section');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Navigation />
      <div className="sections-container">
        <HeroSection onTurbineClick={handleTurbineClick} />
        <DashboardSection 
          projects={mockProjects} 
          onProjectSelect={handleProjectSelect} 
        />
        {selectedProject && (
          <ProjectDetailsSection 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
