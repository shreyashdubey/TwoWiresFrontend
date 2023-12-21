import React from 'react';
import { motion } from 'framer-motion';

const TreeNod = ({ label, children }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const lineStyle = {
    width: '2px',
    height: '20px',
    backgroundColor: 'blue',
  };

  return (
    <div style={containerStyle}>
      <motion.div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'blue',
          cursor: 'pointer',
          margin: '10px',
        }}
      >
        {label}
      </motion.div>
      {children && (
        <div style={{ display: 'flex' }}>
          <motion.div
            x1="220"
            y1="30"
            x2="360"
            y2="170"
            stroke="#ff0055"
            transition={{ duration: 0.1 }}
          />
          {children}
        </div>
      )}
    </div>
  );
};

const Tre = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TreeNod label="Root">
        <TreeNod label="Child 1">
          <TreeNod label="Grandchild 1" />
          <TreeNod label="Grandchild 2" />
        </TreeNod>
        <TreeNod label="Child 2" />
        <TreeNod label="Child 3">
          <TreeNod label="Grandchild 3" />
        </TreeNod>
      </TreeNod>
    </div>
  );
};

export default Tre;
