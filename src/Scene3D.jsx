import { Text,Html,Float,OrbitControls, Environment, Grid,PerspectiveCamera,useGLTF,SpotLight,Outlines,useAnimations,Plane, Box } from '@react-three/drei'
import { EffectComposer, ToneMapping,Noise, Bloom } from '@react-three/postprocessing'
import { ToneMappingMode,BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import React, { useEffect,useRef,useState, useMemo } from 'react'



export default function Experience()
{
    
    const desk = useGLTF('/model-deskset.glb')
    const lamp = useGLTF('/model-lamp.glb')
    const red_chair = useGLTF('/model-red-chair.glb')
    const motocycle = useGLTF('/model-motocycle-animated.glb')
    
    const { actions, names, mixer } = useAnimations(
        motocycle?.animations || [],
        motocycle?.scene || undefined
    )

    const [chairHovered, setChairHovered] = useState(false)
    const [screenHovered, setscreenHovered] = useState(false)
    
    const [playCount, setPlayCount] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const actionRef = useRef(null)
    const audioRef = useRef(null)

    const handleMotocycleClick = () => {
        if (actions && names && names.length > 0) {
            setPlayCount(1)
            setIsPlaying(true)
                actions[names[0]].reset().play()
                actionRef.current = actions[names[0]]
        }
    }

    useEffect(() => {
        if (!isPlaying || !mixer) return
            const onFinished = () => {
                setPlayCount(count => {
                if (count < 4) {
                    actionRef.current?.reset().play()
                    return count + 1
                } else {
                    actionRef.current?.stop()
                    setIsPlaying(false)
                    return count
                }
                })
        }
        mixer.addEventListener('finished', onFinished)
        return () => {
        mixer.removeEventListener('finished', onFinished) 
        }

    }, [isPlaying, mixer])

    const handleStart = () => {
    const clickAudio = new Audio('/sound-moto-engine.mp3')
    clickAudio.play()
    if (audioRef.current) {
        audioRef.current.play()
        }
    }

    // get red_chair's mesh
    const redChairMeshes = useMemo(() => {
        const arr = []
        if (red_chair.scene) {
            red_chair.scene.traverse(obj => {
                if (obj.isMesh) arr.push(obj)
            })
        }
        return arr
    }, [red_chair.scene])

    // get motocycle's mesh
    const motocycleMeshes = useMemo(() => {
        const arr = []
        if (motocycle.scene) {
            motocycle.scene.traverse(obj => {
                if (obj.isMesh) arr.push(obj)
            })
        }
        return arr
    }, [motocycle.scene])
   

    useEffect(() => {
        // lamp-light
        if (lamp && lamp.scene) {
            const lampLightMesh = lamp.scene.getObjectByName('lamp-light')
            if (lampLightMesh && lampLightMesh.isMesh) {
                lampLightMesh.material = new THREE.MeshStandardMaterial({
                    color: 0xFFD306,
                    emissive: 0xFFD306,
                    emissiveIntensity: 10,
                    metalness: 0.1,
                    roughness: 0.3,
                })
            }
        }
        // moto-front-light
        if (motocycle && motocycle.scene) {
            const front = motocycle.scene.getObjectByName('light-front')
            if (front && front.isMesh) {
                front.material = new THREE.MeshStandardMaterial({
                    color: 0xFFD306,
                    emissive: 0xFFD306,
                    emissiveIntensity: 10,
                    metalness: 0.1,
                    roughness: 0.3,
                })
            }
        // moto-back-light
        const back = motocycle.scene.getObjectByName('light-back')
        if (back && back.isMesh) {
            back.material = new THREE.MeshStandardMaterial({
                color: 0xFF0000,
                emissive: 0xFF0000,
                emissiveIntensity: 10,
                metalness: 0.1,
                roughness: 0.3,
            })
        }
    }
    }, [lamp, motocycle])


    const spotLightRef = useRef()
    const targetRef = useRef()

    useEffect(() => {
        if (spotLightRef.current && targetRef.current) {
        // 設定 target
        spotLightRef.current.target = targetRef.current
        }
    }, [])

    return (
    <>

        <Environment preset='city' ground />
        <color args={ [ 'black' ] } attach="background" />

        <SpotLight
            ref={spotLightRef}
            position={[-1.5, 0.85, 0.4]}
            penumbra={1}
            intensity={1}
            color={0xFFD306}
            distance={10}
            angle={Math.PI / 3}
            attenuation={5}
            anglePower={10}
            castShadow
            opacity={0.5}
            
        />

        {/* 聚光燈目標位置物件 */}
        <primitive object={new THREE.Object3D()} 
                   ref={targetRef}
                   position={[0,0,1.3]} />

        <Plane  
                args={[10, 10]}
                position={[0,-0.02,0]}
                rotation={[-1.5701,0,0]}
                material-color="#000000"
                receiveShadow        
        />

        <PerspectiveCamera 
            makeDefault
            position={[-1, 2.2, 4]}
            near={1}
            far={15}
            target={[0, 1, 0]} />

        <OrbitControls
            target={[0, 1, 0]} 
            autoRotate
            autoRotateSpeed={0.1}
            minAzimuthAngle={-Math.PI / 3}
            maxAzimuthAngle={Math.PI / 6}
            minPolarAngle={Math.PI /3}
            maxPolarAngle={Math.PI / 2}
            minDistance={2.2}   // 最靠近目標的距離
            maxDistance={6}
            enablePan = {false}  />

        
        <primitive object={ desk.scene }  >
            
            <Html
                transform
                wrapperClass='htmlScreen'
                distanceFactor={0.138}
                position={[0, 1.12, -0.39]}
                rotation-x={0}
                onPointerOver={() => setscreenHovered(true)}
                onPointerOut={() => setscreenHovered(false)}
                >
                <a href="https://ray120.gitbook.io/works">
                    <img src="/cv-zh.jpg" alt="cv" style={{ width: '1920px', borderRadius: '4px', cursor: 'pointer' }} />
                </a>
                {screenHovered && (
                    <Html
                    position={[1, 0.6, 0]}
                    center
                    distanceFactor={5}
                    style={{
                background: '#fff',
                color: '#c00',
                padding: '4px 8px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '0.5em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '0px solid #c00',
                whiteSpace: 'nowrap',
                pointerEvents: 'none', // 不擋住 3D 互動
                userSelect: 'none'
            }}
                    >
                    This chair has been by my side through many projects.<br />
                    It wasn’t comfortable, but it’s full of memories.
                    </Html>
                )}
            </Html>
        </primitive>

        <primitive object={lamp.scene} />


        {redChairMeshes.map((mesh) => (
        <primitive
            object={mesh}
            key={mesh.uuid}
            onPointerOver={() => setChairHovered(true)}
            onPointerOut={() => setChairHovered(false)}
        >
        {chairHovered && (
        <>
            <Outlines thickness={3} color="white" />
            <Html
            position={[1, 0.6, 0]} // 根據椅子調整高度
            center
            distanceFactor={5} // 根據場景調整大小
            style={{
                background: '#fff',
                color: '#c00',
                padding: '4px 8px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '0.5em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '0px solid #c00',
                whiteSpace: 'nowrap',
                pointerEvents: 'none', // 不擋住 3D 互動
                userSelect: 'none'
            }}
            >
            This chair has been by my side through many projects.<br /> 
            It wasn’t comfortable, but it’s full of memories.
            </Html>
        </>
        )}
    </primitive>
    ))}


        {motocycle.scene && (
            <primitive
                object={motocycle.scene}
                onClick={e => {handleMotocycleClick(e)
                               handleStart(e)}}
                style={{ cursor: 'pointer' }}
            />
        )}
        

        <Float 
            floatIntensity={3} 
                rotationIntensity={1.2}
                speed={3}>
            <Text
                font="./font.woff"
                fontSize={ 1 }
                position={ [ 1.3, 2, 0.3 ] }
                rotation-y={ -1 }
                maxWidth={ 10}
                textAlign= "left"
                    
                >
                Ray
            </Text>

            <Text
                font="./font.woff"
                fontSize={ 0.2 }
                position={ [ 1.4, 1.5, 0.7 ] }
                rotation-y={ -1 }
                maxWidth={ 10}
                textAlign="left" 
                color={ '#42f572' }
                >
                UIUX & Product Designer
            </Text>
        </Float>

        <Grid
            infiniteGrid 
            fadeDistance={20}
            fadeStength={0.2}
            sectionColor= '#9d4b4b' 
        />
            
        {/* Postprocessing */}
        <EffectComposer>
            <Noise
                premultiply={ true }
                blendFunction={BlendFunction.SOFT_LIGHT}
                opacity={ 0.4 }
                offset={ [ 0.02, 0.02 ] }
            />
            <Bloom
            intensity={0.5}      // 強度
            luminanceThreshold={1.3} // 亮度影響範圍
            luminanceSmoothing={1} // 柔和
            mipmapBlur={true}
            />
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC} /> {/* ToneMapping effect must put in back. */}
        </EffectComposer>
        
    </>
    )
    
}