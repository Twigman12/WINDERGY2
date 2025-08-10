import React, { useState } from 'react';
import './ProjectDetailsSection.css';

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

interface ProjectDetailsSectionProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailsSection: React.FC<ProjectDetailsSectionProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'investment', label: 'Investment', icon: '💰' },
    { id: 'competition', label: 'Competition', icon: '🏆' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getTRLColor = (trl: number) => {
    if (trl >= 7) return '#10b981';
    if (trl >= 5) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <section className="section project-details-section">
      <div className="project-details-container">
        <div className="project-details-header">
          <div className="header-content">
            <h1 className="project-title">{project.name}</h1>
            <div className="project-meta">
              <span className="technology-badge">{project.technologyType}</span>
              <span className="status-badge">{project.status}</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" className="close-icon">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="project-details-content">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>Project Description</h3>
                    <p>{project.description}</p>
                  </div>
                  
                  <div className="overview-card">
                    <h3>Key Metrics</h3>
                    <div className="metrics-grid">
                      <div className="metric-item">
                        <label>Strategic Fit Score</label>
                        <div className="metric-value">
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ 
                                width: `${project.strategicFitScore}%`,
                                backgroundColor: getScoreColor(project.strategicFitScore)
                              }}
                            ></div>
                          </div>
                          <span className="score-text">{project.strategicFitScore}%</span>
                        </div>
                      </div>
                      
                      <div className="metric-item">
                        <label>TRL Level</label>
                        <div className="metric-value">
                          <div className="trl-indicator">
                            <div className="trl-dots">
                              {[1,2,3,4,5,6,7,8,9].map(level => (
                                <div 
                                  key={level} 
                                  className={`trl-dot ${level <= project.trl ? 'active' : ''}`}
                                  style={{ backgroundColor: level <= project.trl ? getTRLColor(project.trl) : undefined }}
                                ></div>
                              ))}
                            </div>
                            <span className="trl-text">TRL {project.trl}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overview-card">
                    <h3>Project Details</h3>
                    <div className="details-list">
                      <div className="detail-item">
                        <span className="detail-label">Funding Stage:</span>
                        <span className="detail-value">{project.fundingStage}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Estimated Cost:</span>
                        <span className="detail-value">{formatCurrency(project.estimatedCost)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Timeline:</span>
                        <span className="detail-value">{project.timeline}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'investment' && project.investment && (
              <div className="investment-tab">
                <div className="investment-grid">
                  <div className="investment-card">
                    <h3>Investment Overview</h3>
                    <div className="investment-metrics">
                      <div className="investment-metric">
                        <label>Required Investment</label>
                        <div className="investment-amount">{formatCurrency(project.investment.required)}</div>
                      </div>
                      <div className="investment-metric">
                        <label>Committed Investment</label>
                        <div className="investment-amount">{formatCurrency(project.investment.committed)}</div>
                      </div>
                      <div className="investment-metric">
                        <label>Investment Source</label>
                        <div className="investment-source">{project.investment.source}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="investment-card">
                    <h3>Investment Progress</h3>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(project.investment.committed / project.investment.required) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {Math.round((project.investment.committed / project.investment.required) * 100)}% Funded
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'competition' && project.competition && (
              <div className="competition-tab">
                <div className="competition-grid">
                  <div className="competition-card">
                    <h3>Key Competitors</h3>
                    <div className="competitors-list">
                      {project.competition.competitors.map((competitor: string, index: number) => (
                        <div key={index} className="competitor-item">
                          <span className="competitor-name">{competitor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="competition-card">
                    <h3>Competitive Advantages</h3>
                    <div className="advantages-list">
                      {project.competition.advantages.map((advantage: string, index: number) => (
                        <div key={index} className="advantage-item">
                          <span className="advantage-icon">✅</span>
                          <span className="advantage-text">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
