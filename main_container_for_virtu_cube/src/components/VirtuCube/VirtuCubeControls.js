import React from 'react';
import './VirtuCube.css';

/**
 * VirtuCubeControls - Provides UI controls for interacting with the Rubik's Cube
 * 
 * This component renders buttons and controls that allow the user to rotate different
 * faces of the cube, reset the cube to its initial state, and trigger auto-solving.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onRotateFace - Function to rotate a face (face, direction)
 * @param {Function} props.onReset - Function to reset the cube
 * @param {Function} props.onSolve - Function to trigger auto-solving
 * @param {boolean} props.disabled - Whether controls should be disabled
 */
const VirtuCubeControls = ({ onRotateFace, onReset, onSolve, disabled = false }) => {
  // Array of faces and their labels
  const faces = [
    { id: 'front', label: 'Front (F)' },
    { id: 'back', label: 'Back (B)' },
    { id: 'up', label: 'Up (U)' },
    { id: 'down', label: 'Down (D)' },
    { id: 'left', label: 'Left (L)' },
    { id: 'right', label: 'Right (R)' }
  ];
  
  // Handle face rotation
  const handleRotate = (face, direction) => {
    if (disabled) return;
    onRotateFace(face, direction);
  };
  
  // Handle reset button click
  const handleReset = () => {
    if (disabled) return;
    onReset();
  };
  
  // Handle solve button click
  const handleSolve = () => {
    if (disabled) return;
    onSolve();
  };

  return (
    <div className="virtucube-controls">
      <div className="controls-section">
        <h3>Face Controls</h3>
        <div className="face-controls">
          {faces.map((face) => (
            <div key={face.id} className="face-control">
              <span className="face-label">{face.label}</span>
              <div className="face-buttons">
                <button
                  className="btn control-btn"
                  onClick={() => handleRotate(face.id, 'clockwise')}
                  disabled={disabled}
                  title={`Rotate ${face.label} clockwise`}
                >
                  ↻
                </button>
                <button
                  className="btn control-btn"
                  onClick={() => handleRotate(face.id, 'counterclockwise')}
                  disabled={disabled}
                  title={`Rotate ${face.label} counter-clockwise`}
                >
                  ↺
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="controls-section actions">
        <button 
          className="btn control-btn reset-btn"
          onClick={handleReset}
          disabled={disabled}
        >
          Reset Cube
        </button>
        
        <button 
          className="btn control-btn solve-btn"
          onClick={handleSolve}
          disabled={disabled}
        >
          Solve Cube
        </button>
      </div>
      
      <div className="controls-section help">
        <h3>Instructions</h3>
        <p>
          Use the controls above to rotate faces of the cube, or click and drag directly on the cube to rotate the entire view.
          Use the Reset button to return the cube to its initial state.
        </p>
      </div>
    </div>
  );
};

export default VirtuCubeControls;
