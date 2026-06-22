import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

type GarageSceneProps = {
  activeStep: number
  reducedMotion: boolean
}

const colors = {
  charcoal: '#171a1c',
  steel: '#343a3e',
  steelLight: '#596166',
  orange: '#dc632f',
  amber: '#ef9c3b',
  floor: '#343738',
  oak: '#765036',
  bin: '#20272b',
}

function Lift({ x, active }: { x: number; active: boolean }) {
  const glow = active ? colors.orange : colors.steel
  return (
    <group position={[x, 0, 0.25]}>
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[2.65, 0.08, 4.1]} />
        <meshStandardMaterial color={active ? '#383230' : '#303335'} roughness={0.9} />
      </mesh>
      {[-0.95, 0.95].map((postX) => (
        <group key={postX} position={[postX, 0, 0]}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <boxGeometry args={[0.18, 1.8, 0.2]} />
            <meshStandardMaterial color={glow} roughness={0.55} metalness={0.5} emissive={active ? '#5a1e0c' : '#000'} />
          </mesh>
          <mesh position={[postX > 0 ? -0.35 : 0.35, 0.25, 0]} rotation={[0, 0, postX > 0 ? -0.25 : 0.25]} castShadow>
            <boxGeometry args={[0.72, 0.08, 0.16]} />
            <meshStandardMaterial color={colors.amber} roughness={0.7} />
          </mesh>
        </group>
      ))}
      <Vehicle active={active} />
    </group>
  )
}

function Vehicle({ active }: { active: boolean }) {
  const vehicle = useRef<Group>(null)
  useFrame((state) => {
    if (vehicle.current && active) {
      vehicle.current.position.y = 0.37 + Math.sin(state.clock.elapsedTime * 1.6) * 0.025
    }
  })

  return (
    <group ref={vehicle} position={[0, 0.37, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.35, 0.32, 2.6]} />
        <meshStandardMaterial color={active ? '#b84c24' : '#a9afb1'} metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.3, -0.1]} castShadow>
        <boxGeometry args={[1.08, 0.36, 1.25]} />
        <meshStandardMaterial color="#1c2529" metalness={0.4} roughness={0.22} />
      </mesh>
      {[-0.72, 0.72].flatMap((wheelX) =>
        [-0.82, 0.82].map((wheelZ) => (
          <mesh key={`${wheelX}-${wheelZ}`} position={[wheelX, -0.08, wheelZ]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 16]} />
            <meshStandardMaterial color="#090a0a" roughness={0.9} />
          </mesh>
        )),
      )}
    </group>
  )
}

function Shelf({ position, active }: { position: [number, number, number]; active: boolean }) {
  return (
    <group position={position}>
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 1.15, 0]} castShadow>
          <boxGeometry args={[0.09, 2.3, 0.72]} />
          <meshStandardMaterial color={colors.steelLight} metalness={0.65} roughness={0.45} />
        </mesh>
      ))}
      {[0.15, 0.8, 1.45, 2.1].map((y, row) => (
        <group key={y}>
          <mesh position={[0, y, 0]} castShadow>
            <boxGeometry args={[2.65, 0.08, 0.78]} />
            <meshStandardMaterial color={active ? colors.orange : colors.steel} metalness={0.45} roughness={0.55} />
          </mesh>
          {[-0.9, -0.3, 0.3, 0.9].map((x, index) => (
            <mesh key={x} position={[x, y + 0.22, 0.02]} castShadow>
              <boxGeometry args={[0.48, 0.34, 0.58]} />
              <meshStandardMaterial
                color={active && row === 1 && index === 2 ? '#d86834' : colors.bin}
                roughness={0.75}
                emissive={active && row === 1 && index === 2 ? '#57200e' : '#000'}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Workbench({ active }: { active: boolean }) {
  return (
    <group position={[0, 0, -4.75]}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[4.5, 0.18, 0.85]} />
        <meshStandardMaterial color={colors.oak} roughness={0.82} />
      </mesh>
      {[-1.8, 1.8].map((x) => (
        <mesh key={x} position={[x, 0.4, 0]} castShadow>
          <boxGeometry args={[0.15, 0.8, 0.68]} />
          <meshStandardMaterial color={colors.steel} metalness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 1.75, -0.36]} castShadow>
        <boxGeometry args={[4.5, 1.55, 0.08]} />
        <meshStandardMaterial color={active ? '#512111' : '#202325'} roughness={0.9} emissive={active ? '#2d1009' : '#000'} />
      </mesh>
      {[[-1.3, 1.75], [-0.45, 1.6], [0.45, 1.85], [1.25, 1.65]].map(([x, y], index) => (
        <mesh key={index} position={[x, y, -0.27]} rotation={[0, 0, 0.12 * (index - 1)]} castShadow>
          <boxGeometry args={[0.12, 0.7, 0.08]} />
          <meshStandardMaterial color={index === 2 ? colors.orange : '#9a9fa1'} metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
    </group>
  )
}

function RestockArea({ active }: { active: boolean }) {
  return (
    <group position={[6.2, 0, -3.8]}>
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[2.1, 0.9, 1.25]} />
        <meshStandardMaterial color={active ? '#91401f' : '#4d423a'} roughness={0.8} emissive={active ? '#3d1408' : '#000'} />
      </mesh>
      {[-0.65, 0, 0.65].map((x, index) => (
        <mesh key={x} position={[x, 1.1, index % 2 ? -0.1 : 0.1]} castShadow>
          <boxGeometry args={[0.55, 0.48, 0.68]} />
          <meshStandardMaterial color={index === 1 ? colors.orange : '#806048'} roughness={0.84} />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const targetX = reducedMotion ? 0 : Math.sin(t * 0.16) * 0.22
    const targetZ = reducedMotion ? 10.8 : 10.8 + Math.cos(t * 0.13) * 0.18
    state.camera.position.x += (targetX - state.camera.position.x) * 0.025
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.025
    state.camera.lookAt(0, 0.2, -0.6)
  })
  return null
}

function Scene({ activeStep, reducedMotion }: GarageSceneProps) {
  const floor = useRef<Mesh>(null)
  return (
    <>
      <color attach="background" args={['#111315']} />
      <fog attach="fog" args={['#111315', 12, 24]} />
      <ambientLight intensity={1.05} color="#dde5e5" />
      <hemisphereLight args={['#e7eef0', '#2d1e17', 1.3]} />
      <directionalLight position={[-5, 9, 6]} intensity={3.2} color="#fff4df" castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[4, 8, -5]} angle={0.56} penumbra={0.55} intensity={5.8} color="#ef9b58" castShadow />
      <pointLight position={[-6, 4, 1]} intensity={12} distance={12} decay={2} color="#d8e7eb" />
      <pointLight position={[6, 4, 1]} intensity={11} distance={12} decay={2} color="#ffd0aa" />
      <CameraRig reducedMotion={reducedMotion} />
      <mesh ref={floor} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 17]} />
        <meshStandardMaterial color={colors.floor} roughness={0.96} metalness={0.08} />
      </mesh>
      <mesh position={[0, 2.5, -6.4]} receiveShadow>
        <boxGeometry args={[22, 5, 0.18]} />
        <meshStandardMaterial color="#1b1e20" roughness={0.92} />
      </mesh>
      <Lift x={-3.7} active={activeStep === 0 || activeStep === 1} />
      <Lift x={0} active={activeStep === 0} />
      <Lift x={3.7} active={activeStep === 0} />
      <Shelf position={[-7.1, 0, -1.2]} active={activeStep === 2 || activeStep === 3} />
      <Shelf position={[7.1, 0, -1.2]} active={activeStep === 2 || activeStep === 3} />
      <Workbench active={activeStep === 1} />
      <RestockArea active={activeStep === 4} />
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 11]} />
        <meshBasicMaterial color="#070809" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </>
  )
}

export default function GarageScene(props: GarageSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.45]}
      camera={{ position: [0, 9.1, 10.8], fov: 44, near: 0.1, far: 40 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
    >
      <Scene {...props} />
    </Canvas>
  )
}
