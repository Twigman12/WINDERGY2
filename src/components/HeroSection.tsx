import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import './HeroSection.css';

interface HeroSectionProps {
  onTurbineClick: (component: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTurbineClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [funFact, setFunFact] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a2a4a);
    sceneRef.current = scene;

    // Orthographic camera for schematic view
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 90;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2, 
      frustumSize * aspect / 2, 
      frustumSize / 2, 
      frustumSize / -2, 
      1, 
      1000
    );
    camera.position.set(0, 25, 100);
    camera.lookAt(0, 25, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Grids
    const floorGrid = new THREE.GridHelper(200, 50, 0x0077be, 0x0077be);
    scene.add(floorGrid);

    const backgroundGrid = new THREE.GridHelper(200, 20, 0x0077be, 0x0077be);
    backgroundGrid.rotation.x = Math.PI / 2;
    backgroundGrid.position.z = -60;
    scene.add(backgroundGrid);

    // Wind Turbine Construction
    const turbineGroup = new THREE.Group();
    const clickableObjects: THREE.Object3D[] = [];

    const blueprintMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00bfff, 
      wireframe: true 
    });
    const blueprintHighlightColor = 0xffffff;

    // 1. Tower
    const towerGeometry = new THREE.CylinderGeometry(1.5, 3, 40, 32, 4, false);
    const tower = new THREE.Mesh(towerGeometry, blueprintMaterial.clone());
    tower.position.y = 20;
    tower.userData = { 
      name: "Tower",
      originalColor: blueprintMaterial.color.getHex(),
    };
    turbineGroup.add(tower);
    clickableObjects.push(tower);

    // 2. Nacelle (the box on top)
    const nacelle = new THREE.Group();
    const mainNacelleShape = new THREE.Mesh(
      new THREE.BoxGeometry(8, 5, 6), 
      blueprintMaterial.clone()
    );
    const rearNacelleShape = new THREE.Mesh(
      new THREE.SphereGeometry(3, 16, 16), 
      blueprintMaterial.clone()
    );
    rearNacelleShape.position.x = -4;
    nacelle.add(mainNacelleShape, rearNacelleShape);
    nacelle.position.y = 42.5;
    nacelle.userData = { name: "Nacelle" };
    turbineGroup.add(nacelle);
    clickableObjects.push(nacelle);

    // 3. Rotor Hub & Blades
    const rotorHub = new THREE.Group();
    const hubGeometry = new THREE.SphereGeometry(2.5, 20, 20);
    const hub = new THREE.Mesh(hubGeometry, blueprintMaterial.clone());
    hub.position.z = 3;
    rotorHub.add(hub);
    nacelle.add(rotorHub);

    function createBlade() {
      const bladeProfile = new THREE.Shape();
      bladeProfile.moveTo(0, 0);
      bladeProfile.bezierCurveTo(0.5, 0.1, 1, 0.4, 1.2, 1.5);
      bladeProfile.bezierCurveTo(1.3, 2.5, 0.8, 3, 0, 3);
      bladeProfile.lineTo(0, 0);
      
      const extrudeSettings = { 
        steps: 20, 
        depth: 22, 
        bevelEnabled: false, 
        extrudePath: new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0), 
          new THREE.Vector3(0, 0, 22)
        ]), 
        taper: (t: number) => 1.0 - t * 0.8, 
        twist: (t: number) => t * Math.PI / 6 
      };
      
      const geometry = new THREE.ExtrudeGeometry(bladeProfile, extrudeSettings);
      geometry.center();
      geometry.rotateX(Math.PI / 2);
      geometry.scale(1, 1, 0.5);
      geometry.translate(0, 11, 0);
      return new THREE.Mesh(geometry, blueprintMaterial.clone());
    }

    for (let i = 0; i < 3; i++) {
      const blade = createBlade();
      blade.rotation.z = (i * 2 * Math.PI) / 3;
      blade.userData = { 
        name: "Blade",
        originalColor: blueprintMaterial.color.getHex(),
      };
      rotorHub.add(blade);
      clickableObjects.push(blade);
    }
    
    scene.add(turbineGroup);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject: THREE.Object3D | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects, true);

      let currentHoverObject = null;
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while(obj.parent && !obj.userData.name) {
          obj = obj.parent;
        }
        currentHoverObject = obj;
      }

      if (intersectedObject !== currentHoverObject) {
        if (intersectedObject && (intersectedObject as THREE.Mesh).isMesh) {
          const mesh = intersectedObject as THREE.Mesh;
          const material = mesh.material as THREE.MeshBasicMaterial;
          material.color.setHex(intersectedObject.userData.originalColor);
        }
        
        intersectedObject = currentHoverObject;

        if (intersectedObject) {
          document.body.style.cursor = 'pointer';
          setHoveredComponent(intersectedObject.userData.name);
          if ((intersectedObject as THREE.Mesh).isMesh) {
            const mesh = intersectedObject as THREE.Mesh;
            const material = mesh.material as THREE.MeshBasicMaterial;
            material.color.setHex(blueprintHighlightColor);
          }
        } else {
          document.body.style.cursor = 'default';
          setHoveredComponent(null);
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (intersectedObject && intersectedObject.userData.name) {
        const componentName = intersectedObject.userData.name;
        setModalContent({
          title: `About the ${componentName}`,
          content: "Click the button below to learn more about this component."
        });
        setShowModal(true);
        onTurbineClick(componentName.toLowerCase());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotate the rotor hub
      rotorHub.rotation.z += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = frustumSize * aspect / -2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [onTurbineClick]);

  // Mock AI function (replace with actual API call)
  const generateExplanation = async (component: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const explanations: { [key: string]: string } = {
      blade: "Wind turbine blades are aerodynamic surfaces that capture kinetic energy from the wind. They're designed with airfoil shapes similar to airplane wings, creating lift that rotates the turbine. Modern blades can be over 100 feet long and are made from lightweight composite materials for strength and efficiency.",
      nacelle: "The nacelle is the housing unit that sits atop the tower and contains the turbine's key mechanical and electrical components. It includes the gearbox, generator, controller, and brake system. This compact structure protects sensitive equipment from weather while maintaining optimal positioning for wind capture.",
      tower: "The tower provides the structural foundation that elevates the turbine components to heights where wind speeds are higher and more consistent. Modern towers can reach heights of 300+ feet and are typically constructed from steel or concrete. Taller towers access stronger winds, significantly increasing energy production."
    };
    
    setModalContent({
      title: `About the ${component.charAt(0).toUpperCase() + component.slice(1)}`,
      content: explanations[component] || "Component information not available."
    });
    setIsLoading(false);
  };

  const getFunFact = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const facts = [
      "A single modern wind turbine can power over 1,400 homes for a year!",
      "Wind energy is one of the fastest-growing energy sources worldwide, with capacity doubling every 3 years.",
      "The largest wind turbines can have blades longer than a football field.",
      "Wind turbines can operate in temperatures ranging from -40°F to 120°F.",
      "A wind turbine typically pays for itself in energy production within 6-8 months of operation."
    ];
    setFunFact(facts[Math.floor(Math.random() * facts.length)]);
    setIsLoading(false);
  };

  return (
    <section id="hero" className="section hero-section">
      <div className="hero-background">
        <canvas 
          ref={canvasRef} 
          className="three-canvas"
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      </div>

      <div className="hero-overlay">
        {/* Main Content */}
        <div className="main-content">
          <h1 className="headline">Clean energy,<br/>Investment index</h1>
          <p className="description">
            Explore wind turbine components in 3D and learn about renewable energy through AI-powered insights.
          </p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={getFunFact}>
              <span>💡</span>
              User Guide
            </button>
            <button className="cta-button secondary" onClick={() => setShowInfo(!showInfo)}>
              <span>🔍</span>
              Explore Components
            </button>
          </div>
        </div>



        {/* Component Tooltip */}
        {hoveredComponent && (
          <div className="component-tooltip">
            {hoveredComponent}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="explanation-modal">
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <h2>{modalContent.title}</h2>
            <div className="explanation-content">
              {isLoading ? "Generating..." : modalContent.content}
            </div>
            <button 
              className="gemini-button" 
              onClick={() => generateExplanation(hoveredComponent?.toLowerCase() || '')}
              disabled={isLoading}
            >
              ✨ Generate Explanation
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <div className="loader"></div>}

        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <p>Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
