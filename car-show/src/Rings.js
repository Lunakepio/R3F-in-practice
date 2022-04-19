import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings() {
  const itemsRef = useRef([]);

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      let az = Math.abs(z);
      mesh.position.set(0, 0, -z);
      mesh.scale.set(1 - az * 0.04, 1 - az * 0.04, 1 - az * 0.04);

      let colorScale = 1;
      let dist = Math.abs(z);
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      let cs = colorScale * 0.5;

      if (i % 2 == 1) {
        mesh.material.emissive = new Color(6 * cs, 0.15 * cs, 0.7 * cs);
      } else {
        mesh.material.emissive = new Color(0.1 * cs, 0.7 * cs, 3 * cs);
      }
    }
  });

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[4, 0.1, 0.4]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
}