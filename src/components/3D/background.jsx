import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

const BackGround = (props) => {
  return (
    <mesh
      rotation={new THREE.Euler(0,Math.PI/4,0,"XYZ")}
      position={new THREE.Vector3(-25,props.yPos-12.5,-25)}
    >
      <planeGeometry
        width={160}
        height={180}
      />
      <meshLambertMaterial
        color={0xee99ff}
      />
    </mesh>

  );
}

export default BackGround;
