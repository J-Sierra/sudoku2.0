import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Preload, Points } from "drei";

const generateRandomStarPoints = (numPoints, radius) => {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const u = Math.random();
    const r = radius * Math.cbrt(u);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    const type = Math.floor(Math.random() * 3); // Randomly select a type (0, 1, or 2)
    points.push({ x, y, z, type });
  }

  return points;
};

const StarShapes = {
  0: (position) => (
    <mesh position={position}>
      <sphereBufferGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial color="#fff" />
    </mesh>
  ),
  1: (position) => (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry args={[0.02, 0.005, 0.005]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry args={[0.005, 0.02, 0.005]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  ),
  2: (position) => (
    <mesh position={position}>
      <coneBufferGeometry args={[0.01, 0.02, 3]} />
      <meshBasicMaterial color="#fff" />
    </mesh>
  ),
};

const Stars = (props) => {
  const ref = useRef();
  const [stars] = useState(() => generateRandomStarPoints(2000, 1));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    ref.current.rotation.z -= delta / 10;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {stars.map((star, index) => (
        <React.Fragment key={index}>
          {StarShapes[star.type]([star.x, star.y, star.z])}
        </React.Fragment>
      ))}
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
