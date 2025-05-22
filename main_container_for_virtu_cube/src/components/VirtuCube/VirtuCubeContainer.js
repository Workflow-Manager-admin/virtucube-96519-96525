import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import VirtuCubeControls from './VirtuCubeControls';
import './VirtuCube.css';

/**
 * VirtuCubeContainer - Primary container for the interactive 3D Rubik's Cube
 * 
 * This component manages the Three.js scene, camera, renderer, and lighting setup
 * for displaying an interactive 3D Rubik's Cube. It handles initialization, animation
 * loop, and cleanup of 3D resources.
 */
const VirtuCubeContainer = () => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cubeState, setCubeState] = useState({
    isRotating: false,
    isSolving: false
  });
  
  // Scene objects stored in ref to persist between renders
  const sceneRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    cube: null,
    controls: null,
    animationId: null
  });

  // Initialize the Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1A1A1A');
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Create orbit controls for camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.rotateSpeed = 0.5;
    
    // Initialize Rubik's Cube (placeholder for now)
    const cube = createRubiksCube();
    scene.add(cube);
    
    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      cube,
      controls,
      animationId: null
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation loop
    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      
      // Rotate the cube slightly for demonstration
      if (!cubeState.isRotating && !cubeState.isSolving) {
        cube.rotation.y += 0.005;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoading(false);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(sceneRef.current.animationId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Function to create a simple Rubik's Cube placeholder
  const createRubiksCube = () => {
    // Create a group that will hold all cube pieces
    const rubiksCube = new THREE.Group();
    
    // Size of the entire cube
    const cubeSize = 3;
    // Size of each individual piece
    const pieceSize = 1;
    // Gap between pieces
    const gap = 0.05;
    
    // Define colors for the faces
    const colors = {
      up: 0xffffff,     // White
      down: 0xffff00,   // Yellow
      right: 0xff0000,  // Red
      left: 0xff8000,   // Orange
      front: 0x00ff00,  // Green
      back: 0x0000ff    // Blue
    };

    // For a standard 3x3x3 Rubik's Cube
    const offset = ((cubeSize - 1) / 2) * (pieceSize + gap);
    
    // Create each piece (simplified as colored boxes)
    for (let x = 0; x < cubeSize; x++) {
      for (let y = 0; y < cubeSize; y++) {
        for (let z = 0; z < cubeSize; z++) {
          // Skip the center piece and pieces entirely inside the cube
          if (x === 1 && y === 1 && z === 1) continue;
          
          const geometry = new THREE.BoxGeometry(pieceSize, pieceSize, pieceSize);
          
          // Array to hold materials for each face
          const materials = [];
          
          // Right face (positive X)
          materials.push(
            new THREE.MeshBasicMaterial({
              color: x === cubeSize - 1 ? colors.right : 0x111111,
              transparent: x !== cubeSize - 1,
              opacity: x !== cubeSize - 1 ? 0 : 1
            })
          );
          
          // Left face (negative X)
          materials.push(
            new THREE.MeshBasicMaterial({
              color: x === 0 ? colors.left : 0x111111,
              transparent: x !== 0,
              opacity: x !== 0 ? 0 : 1
            })
          );
          
          // Up face (positive Y)
          materials.push(
            new THREE.MeshBasicMaterial({
              color: y === cubeSize - 1 ? colors.up : 0x111111,
              transparent: y !== cubeSize - 1,
              opacity: y !== cubeSize - 1 ? 0 : 1
            })
          );
          
          // Down face (negative Y)
          materials.push(
            new THREE.MeshBasicMaterial({
              color: y === 0 ? colors.down : 0x111111,
              transparent: y !== 0,
              opacity: y !== 0 ? 0 : 1
            })
          );
          
          // Front face (positive Z)
          materials.push(
            new THREE.MeshBasicMaterial({
              color: z === cubeSize - 1 ? colors.front : 0x111111,
              transparent: z !== cubeSize - 1,
              opacity: z !== cubeSize - 1 ? 0 : 1
            })
          );
          
          // Back face (negative Z)
          materials.push(
            new THREE.MeshBasicMaterial({
              color: z === 0 ? colors.back : 0x111111,
              transparent: z !== 0,
              opacity: z !== 0 ? 0 : 1
            })
          );

          const piece = new THREE.Mesh(geometry, materials);
          
          // Position each piece
          piece.position.x = (x - 1) * (pieceSize + gap) + (x === 0 ? -offset : x === 2 ? offset : 0);
          piece.position.y = (y - 1) * (pieceSize + gap) + (y === 0 ? -offset : y === 2 ? offset : 0);
          piece.position.z = (z - 1) * (pieceSize + gap) + (z === 0 ? -offset : z === 2 ? offset : 0);
          
          // Add piece to the cube group
          rubiksCube.add(piece);
        }
      }
    }
    
    return rubiksCube;
  };

  // Functions to control the cube (to be implemented)
  const rotateFace = (face, direction) => {
    // Placeholder for face rotation logic
    console.log(`Rotating face ${face} in direction ${direction}`);
    setCubeState({ ...cubeState, isRotating: true });
    
    // Simulate rotation completion
    setTimeout(() => {
      setCubeState({ ...cubeState, isRotating: false });
    }, 500);
  };

  const resetCube = () => {
    // Placeholder for reset logic
    console.log('Resetting cube');
    if (sceneRef.current.cube) {
      sceneRef.current.cube.rotation.set(0, 0, 0);
    }
  };

  const startSolving = () => {
    // Placeholder for solve animation
    console.log('Starting solve animation');
    setCubeState({ ...cubeState, isSolving: true });
    
    // Simulate solve completion
    setTimeout(() => {
      setCubeState({ ...cubeState, isSolving: false });
    }, 3000);
  };

  return (
    <div className="virtucube-container">
      {isLoading && (
        <div className="loading-overlay">
          <p>Loading VirtuCube...</p>
        </div>
      )}
      
      <div 
        ref={mountRef} 
        className="canvas-container" 
      />
      
      <VirtuCubeControls
        onRotateFace={rotateFace}
        onReset={resetCube}
        onSolve={startSolving}
        disabled={isLoading || cubeState.isRotating || cubeState.isSolving}
      />
    </div>
  );
};

export default VirtuCubeContainer;
