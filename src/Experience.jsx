import { Text,Html,Float,OrbitControls, Environment,ContactShadows, Grid,PerspectiveCamera,useGLTF,useProgress } from '@react-three/drei'
import { EffectComposer, ToneMapping,Noise } from '@react-three/postprocessing'
import { ToneMappingMode,BlendFunction } from 'postprocessing'



export default function Experience()
{
    
    const desk = useGLTF('/3d.glb')
    
    


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
            minAzimuthAngle={-Math.PI / 4}
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
            <a href="https://ray120.gitbook.io/works" target="_blank" rel="noopener noreferrer">
                <img src="/cv-zh.jpg" alt="cv" style={{ width: '1920px', borderRadius: '4px', cursor: 'pointer' }} />
            </a>
            </Html>
        </primitive>

        
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
        
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC} /> {/* ToneMapping effect must put in back. */}
        </EffectComposer>
        
    </>
    )
    
}