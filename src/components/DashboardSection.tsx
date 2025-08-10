import React from 'react';
import './DashboardSection.css';

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
}

interface DashboardSectionProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ projects, onProjectSelect }) => {
  return (
    <section className="section dashboard-section">
      <div className="animejs-container">
        <iframe 
          src="/animejs.html" 
          title="Anime.js Documentation"
          className="animejs-iframe"
          frameBorder="0"
        />
      </div>
    </section>
  );
};

export default DashboardSection;
