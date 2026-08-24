import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const CANDLE_COLORS = ["#ff8fc7", "#ffd27d", "#b794ff", "#7defff", "#ff9ed2"];
const SPRINKLE_COLORS = ["#ff6fae", "#ffd27d", "#7defff", "#b794ff", "#ffffff"];

/* ------------------------------------------------------------------ */
/* A single candle with an animated, clickable flame                   */
/* ------------------------------------------------------------------ */
function Candle({
  position,
  color,
  index,
  lit,
  onBlow,
}: {
  position: [number, number, number];
  color: string;
  index: number;
  lit: boolean;
  onBlow: (i: number) => void;
}) {
  const flame = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lit) return;
    const t = state.clock.elapsedTime;
    const flick =
      0.9 +
      Math.sin(t * 16 + index * 1.7) * 0.07 +
      Math.sin(t * 27 + index) * 0.04;
    if (flame.current) {
      flame.current.scale.set(0.9 + flick * 0.12, flick, 0.9 + flick * 0.12);
      flame.current.position.y = 0.34 + Math.sin(t * 10 + index) * 0.01;
    }
    if (light.current) light.current.intensity = 0.7 + flick * 0.5;
  });

  return (
    <group position={position}>
      {/* candle body */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.36, 16]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      {/* candle stripes (thin rings) */}
      <mesh position={[0, 0.28, 0]}>
        <torusGeometry args={[0.05, 0.012, 8, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.05, 0.012, 8, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      {/* wick */}
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.04, 6]} />
        <meshStandardMaterial color="#2b1a12" />
      </mesh>

      {/* flame (clickable to blow out) */}
      <group
        ref={flame}
        position={[0, 0.34, 0]}
        visible={lit}
        onPointerDown={(e) => {
          e.stopPropagation();
          onBlow(index);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <mesh position={[0, 0.12, 0]}>
          <coneGeometry args={[0.05, 0.2, 14]} />
          <meshStandardMaterial
            color="#ffb24d"
            emissive="#ff7a00"
            emissiveIntensity={2.4}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshStandardMaterial
            color="#fff3b0"
            emissive="#ffd24d"
            emissiveIntensity={3}
          />
        </mesh>
      </group>

      <pointLight
        ref={light}
        position={[0, 0.45, 0]}
        color="#ffae57"
        intensity={lit ? 1 : 0}
        distance={3.2}
        decay={2}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* A cake tier with a frosting rim and little drips                    */
/* ------------------------------------------------------------------ */
function Tier({
  y,
  radius,
  height,
  color,
  frosting,
}: {
  y: number;
  radius: number;
  height: number;
  color: string;
  frosting: string;
}) {
  // small decorative drips around the rim
  const drips = useMemo(() => {
    const arr: { a: number; len: number }[] = [];
    const n = Math.round(radius * 16);
    for (let i = 0; i < n; i++) {
      arr.push({ a: (i / n) * Math.PI * 2, len: 0.1 + (i % 3) * 0.06 });
    }
    return arr;
  }, [radius]);

  return (
    <group position={[0, y, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 48]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      {/* top frosting disc */}
      <mesh position={[0, height / 2 + 0.02, 0]}>
        <cylinderGeometry args={[radius + 0.01, radius + 0.01, 0.06, 48]} />
        <meshStandardMaterial color={frosting} roughness={0.4} />
      </mesh>
      {/* frosting rim */}
      <mesh position={[0, height / 2 + 0.05, 0]}>
        <torusGeometry args={[radius, 0.05, 12, 48]} />
        <meshStandardMaterial color={frosting} roughness={0.35} />
      </mesh>
      {/* drips hanging from the frosting rim */}
      {drips.map((d, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(d.a) * radius,
            height / 2 - d.len / 2,
            Math.sin(d.a) * radius,
          ]}
          scale={[1, d.len / 0.1, 1]}
        >
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color={frosting} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Sprinkles scattered on the cake                                     */
/* ------------------------------------------------------------------ */
function Sprinkles() {
  const items = useMemo(() => {
    const arr: {
      pos: [number, number, number];
      rot: [number, number, number];
      color: string;
    }[] = [];
    const ring = (r: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + Math.random();
        arr.push({
          pos: [Math.cos(a) * r, y, Math.sin(a) * r],
          rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
          color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
        });
      }
    };
    ring(1.18, 0.83, 14);
    ring(0.78, 1.41, 10);
    return arr;
  }, []);

  return (
    <group>
      {items.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <capsuleGeometry args={[0.018, 0.07, 4, 8]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={0.25}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The whole cake scene                                                */
/* ------------------------------------------------------------------ */
export type CakeSceneProps = {
  candlesLit: boolean[];
  onBlow: (i: number) => void;
};

function Cake({ candlesLit, onBlow }: CakeSceneProps) {
  return (
    <group position={[0, -0.9, 0]}>
      {/* plate */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 1.9, 0.06, 64]} />
        <meshStandardMaterial
          color="#2a154f"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      <Tier y={0.06} radius={1.2} height={0.7} color="#ff9ec7" frosting="#ffe6f1" />
      <Tier y={0.72} radius={0.82} height={0.62} color="#b794ff" frosting="#efe6ff" />
      <Tier y={1.32} radius={0.46} height={0.5} color="#ffd27d" frosting="#fff3d6" />

      <Sprinkles />

      {/* candles around the top tier */}
      {candlesLit.map((lit, i) => {
        const n = candlesLit.length;
        const a = (i / n) * Math.PI * 2;
        const r = 0.3;
        return (
          <Candle
            key={i}
            index={i}
            lit={lit}
            color={CANDLE_COLORS[i % CANDLE_COLORS.length]}
            position={[Math.cos(a) * r, 1.62, Math.sin(a) * r]}
            onBlow={onBlow}
          />
        );
      })}
    </group>
  );
}

export default function Cake3D({
  candlesLit,
  onBlow,
}: CakeSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.4, 5.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 2, -3]} intensity={1.2} color="#7defff" />
      <pointLight position={[5, 1, 2]} intensity={1.1} color="#ff6fae" />

      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
        <Cake candlesLit={candlesLit} onBlow={onBlow} />
      </Float>

      <Sparkles
        count={50}
        scale={[7, 5, 7]}
        size={4}
        speed={0.4}
        color="#ffe6a3"
        opacity={0.7}
      />

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.5}
        scale={9}
        blur={2.6}
        far={4}
        color="#000010"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.9}
        target={[0, 0.15, 0]}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}


