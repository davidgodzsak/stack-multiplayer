import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

const ActiveBlock = (props) => {
  let block = props.block;

  return (
    <mesh
      position={new THREE.Vector3(block.center.x,
                                  block.center.y,
                                  block.center.z)}
    >
      <boxGeometry
        width={block.size.x}
        height={block.size.y}
        depth={block.size.z}
      />
      <meshLambertMaterial
        color={new THREE.Color(block.colour)}
      />
    </mesh>
  )
};

export default ActiveBlock;
