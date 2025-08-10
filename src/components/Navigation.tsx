import React from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <header id="site-header" className="layout-container text-ui ui-overlay">
      <div id="site-header-content">
        <h1 className="heading-logo header-logo">
          <a href="#hero">
            <span>Clean Energy Explorer | Interactive Wind Energy Platform</span>
          </a>
        </h1>
        <nav id="site-menu">
          <ul>
            <li>
              <a className="main-nav-link docs-link is-active" data-id="docs" href="#hero" title="Home" onClick={(e) => {
                e.preventDefault();
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g id="sidebar" fill="none" fillRule="evenodd">
                    <path id="rectangle" fill="#FFFFFF" fillRule="nonzero" d="M16.167 6.125H7.833A3.375 3.375 0 0 0 4.458 9.5v5a3.375 3.375 0 0 0 3.375 3.375h8.334a3.375 3.375 0 0 0 3.375-3.375v-5a3.375 3.375 0 0 0-3.375-3.375zm-8.334 1.75h8.334c.897 0 1.625.728 1.625 1.625v5c0 .897-.728 1.625-1.625 1.625H7.833A1.625 1.625 0 0 1 6.208 14.5v-5c0-.897.728-1.625 1.625-1.625z"></path>
                    <polyline id="Path-42" stroke="#FFFFFF" strokeWidth="1.75" points="9.5 7.75 9.5 12 9.5 16.25" data-points="13.5 8.75 10.5 12 13.5 15.25"></polyline>
                  </g>
                </svg>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a className="main-nav-link" href="#dashboard" title="Projects">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g fill="none" fillRule="evenodd">
                    <path fill="currentColor" fillRule="nonzero" d="M16.1666667,6.125 L7.83333333,6.125 C5.9693723,6.125 4.45833333,7.63603897 4.45833333,9.5 L4.45833333,14.5 C4.45833333,16.363961 5.9693723,17.875 7.83333333,17.875 L16.1666667,17.875 C18.0306277,17.875 19.5416667,16.363961 19.5416667,14.5 L19.5416667,9.5 C19.5416667,7.63603897 18.0306277,6.125 16.1666667,6.125 Z M7.83333333,7.875 L16.1666667,7.875 C17.0641294,7.875 17.7916667,8.60253728 17.7916667,9.5 L17.7916667,14.5 C17.7916667,15.3974627 17.0641294,16.125 16.1666667,16.125 L7.83333333,16.125 C6.93587061,16.125 6.20833333,15.3974627 6.20833333,14.5 L6.20833333,9.5 C6.20833333,8.60253728 6.93587061,7.875 7.83333333,7.875 Z"></path>
                    <path fill="currentColor" d="M10.35,10.5001095 L10.35,13.8820755 C10.35,14.1582179 10.5738576,14.3820755 10.85,14.3820755 C10.9276225,14.3820755 11.0041791,14.364003 11.0736068,14.3292891 L14.4555728,12.6383061 C14.7025621,12.5148115 14.8026742,12.214475 14.6791796,11.9674857 C14.6307978,11.870722 14.5523365,11.7922608 14.4555728,11.7438789 L11.0736068,10.0528959 C10.8266175,9.92940131 10.526281,10.0295135 10.4027864,10.2765027 C10.3796438,10.3227879 10.3638974,10.3722414 10.3559712,10.4230669 L10.35,10.5001095 Z"></path>
                  </g>
                </svg>
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a className="main-nav-link nav-link-retractable" href="#about" title="About">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g id="codepen" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <path id="Shape" stroke="#FFFFFF" strokeWidth="1.75" d="M5 14.355L12 19l7-4.645v-4.71L12 5 5 9.645v4.71zm14 0l-7-4.71-7 4.71m0-4.71l7 4.646 7-4.646M12 5v4.645m0 4.71V19"></path>
                  </g>
                </svg>
                <span>About</span>
              </a>
            </li>

            <li>
              <a className="main-nav-link sponsor-button" href="#saved-projects" title="Saved Projects">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                  <g fill="none" fillRule="evenodd">
                    <path fill="currentColor" fillRule="nonzero" d="M12 18.445a.778.778 0 0 1-.34-.078C11.39 18.235 5 15.077 5 9.889a3.889 3.889 0 0 1 6.638-2.75L12 7.5l.362-.361A3.889 3.889 0 0 1 19 9.889c0 5.17-6.387 8.344-6.66 8.478a.778.778 0 0 1-.34.078z"></path>
                  </g>
                </svg>
                <span>Saved Projects</span>
              </a>
            </li>
          </ul>
        </nav>
        <button id="toggle-site-menu" className="ui-input trigger-pane" title="Toggle site menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
            <g id="menu" fill="none" fillRule="evenodd">
              <rect id="Rectangle" width="16" height="1.75" x="4" y="8" fill="#FFFFFF"></rect>
              <rect id="Rectangle-Copy" width="16" height="1.75" x="4" y="14" fill="#FFFFFF"></rect>
            </g>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
