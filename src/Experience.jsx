import { Text,Html,Float,OrbitControls, Environment,ContactShadows, Grid,PerspectiveCamera,useGLTF,Outlines } from '@react-three/drei'
import { EffectComposer, ToneMapping,Noise, Bloom } from '@react-three/postprocessing'
import { ToneMappingMode,BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import React, { useEffect } from 'react'


export default function Experience()
{
    
    const desk = useGLTF('/3d.glb')
    const lamp = useGLTF('/lamp.glb')
    const red_chair = useGLTF('/red-chair.glb')
    const motocycle = useGLTF('/motocycle.glb')

    // lamp-light
    useEffect(() => {
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
    }, [lamp])

    // moto-front-light
    useEffect(() => {
        if (motocycle && motocycle.scene) {
            const motocycleLightMesh = motocycle.scene.getObjectByName('light-front')
            if (motocycleLightMesh && motocycleLightMesh.isMesh) {
                motocycleLightMesh.material = new THREE.MeshStandardMaterial({
                    color: 0xFFD306,
                    emissive: 0xFFD306,
                    emissiveIntensity: 10,
                    metalness: 0.1,
                    roughness: 0.3,
                })
            }
        }
    }, [motocycle])

    // moto-back-light
    useEffect(() => {
        if (motocycle && motocycle.scene) {
            const motocycleLightMesh = motocycle.scene.getObjectByName('light-back')
            if (motocycleLightMesh && motocycleLightMesh.isMesh) {
                motocycleLightMesh.material = new THREE.MeshStandardMaterial({
                    color: 0xFF0000,
                    emissive: 0xFF0000,
                    emissiveIntensity: 10,
                    metalness: 0.1,
                    roughness: 0.3,
                })
            }
        }
    }, [motocycle])

    return (
    <>
        
        

        


        <Environment preset='city' />
        <color args={ [ 'black' ] } attach="background" />

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
            distanceFactor={ 0.145 }
            position={ [ 0, 1.145, -0.38 ] }
            rotation-x={ 0 }
            >
            <a href="https://ray120.gitbook.io/works" >
                <img src="/cv-zh.jpg" alt="cv" style={{ width: '1920px', borderRadius: '4px', cursor: 'pointer' }} />
            </a>
            </Html>
        </primitive>

        <primitive object={ lamp.scene }  ></primitive>
        <primitive object={ red_chair.scene }  >
            
        </primitive>
        <primitive object={ motocycle.scene }  ></primitive>
        
        <Float 
            floatIntensity={ 1 } 
            rotationIntensity={ 0 }
            speed={ 3 }>
            <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={ 0.5 }
            position={ [ 1.3, 2, 0.3 ] }
            rotation-y={ -1 }
            maxWidth={ 10}
            textAlign= "left"     
            >
            Ray
            </Text>

            <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={ 0.2 }
            position={ [ 1.5, 1.5, 1.3 ] }
            rotation-y={ -1 }
            maxWidth={ 10}
            textAlign="left" 
            >
            UIUX & Product Designer
            </Text>
        </Float>

        {/* <ContactShadows 
            position-y={ -0.01 }
            opacity={0.5}
            blur={2.4}/> */}

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
            intensity={0.5}      // 強度，可調整
            luminanceThreshold={1.3} // 亮度門檻，低一點會讓更多東西發光
            luminanceSmoothing={1} // 柔和度
            mipmapBlur={true}
            />


            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC} /> {/* ToneMapping effect must put in back. */}
        </EffectComposer>
        
    </>
    )
    
}