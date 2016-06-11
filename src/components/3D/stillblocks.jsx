import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

const StillBlocks = (props) => {
  let blocks = props.blocks;

  return (
    <group>
      {
        blocks.map(block =>
          <mesh
            position={new THREE.Vector3(block.center.x,
                                        block.center.y
                                        ,block.center.z
                                        )
                      }
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
      }
    </group>
  )
}

export default StillBlocks;
