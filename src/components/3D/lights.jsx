import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

const Lights = (props) => {
  console.log(props, "lights");

  let base=new THREE.Vector3(0,0,0);


  return(
    <group>
      <ambientLight
        color={0x5f5f5f}
        position={new THREE.Vector3(100, 100, 100)}
      />
      <spotLight
        color={0xaaeeff}
        intensity={.7}
        position={new THREE.Vector3(0, 100, 100)}
        lookAt={base}
      />
      <spotLight
        color={0xffeecc}
        intensity={1}
        position={new THREE.Vector3(100, 100, 0)}
        lookAt={base}

        castShadow={false}

        shadowMapWidth = {8000}
        shadowMapHeight = {8000}
      />
    </group>
  )
}

export default Lights;
