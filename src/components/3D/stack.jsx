import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

import StillBlocks from './stillblocks';
import ActiveBlock from './activeblock';

const Stack = (props) => {
  return (
    <group>
      <ActiveBlock block={props.active} />
      <StillBlocks blocks={props.still} />
    </group>
  )
}

export default Stack;
