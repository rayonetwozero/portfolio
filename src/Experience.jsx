import { Text,Html,Float,OrbitControls, Environment,PresentationControls,ContactShadows } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'

export default function Experience()
{
    const desk = useGLTF('/3d.glb')

    return <>
        <Environment preset='city' />
        <color args={ [ '#AAACAE' ] } attach="background" />

        
        <OrbitControls 
            autoRotate
            autoRotateSpeed={0.1}
            minAzimuthAngle={-Math.PI / 3.5}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI /3}
            maxPolarAngle={Math.PI / 2}  />
       
        <primitive object={ desk.scene }  
        >
            <Html 
                transform
                wrapperClass='htmlScreen'
                distanceFactor={ 0.27 }
                position={ [ 0, 1.1, -0.38 ] }
                rotation-x={ 0 }>
                <iframe src="https://mindtrix.xyz" />
            </Html>
            </primitive>
        
        <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={ 1 }
            position={ [ 3, 2.3, -1 ] }
            rotation-y={ -1 }
            
        >
            Ray
        </Text>

        <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={ 1 }
            position={ [ 5, 0.75, 1.75 ] }
            rotation-y={ -1 }
            maxWidth={ 10}
        >
            5+ years of experiences in UIUX & Product.
        </Text>

        <ContactShadows 
            position-y={ -0.01 }
            opacity={0.5}
            blur={2.4}/>
    </>
}