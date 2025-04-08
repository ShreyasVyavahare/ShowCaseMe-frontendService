import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const BinaryRain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const columns = Math.floor(dimensions.width / 30); // Adjust column count based on width
  const rows = Math.floor(dimensions.height / 30); // Adjust row count based on height

  const getRandomChar = () => {
    const binaryChars = ['0', '1', '0', '1', '0', '1', '░', '▒', '▓', '█'];
    return binaryChars[Math.floor(Math.random() * binaryChars.length)];
  };

  const getRandomColor = () => {
    const colors = ['#00ff41', '#03a062', '#00c973', '#0aff6f', '#00ff9d'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 0.5,
        opacity: 0.2,
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -100 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: dimensions.height + 100,
          }}
          transition={{
            duration: 3 + Math.random() * 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          style={{
            color: getRandomColor(),
            fontFamily: 'monospace',
            fontSize: '1rem',
            textAlign: 'center',
          }}
        >
          {getRandomChar()}
        </motion.div>
      ))}
    </Box>
  );
};

export default BinaryRain;