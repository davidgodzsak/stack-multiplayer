import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

import StillBlocks from './stillblocks';
import ActiveBlock from './activeblock';

const Stack = (props) => {
  let stack = props.stack;

  console.log(stack, "stack");
  return (
    <group>
      <ActiveBlock block={stack.active} />
      <StillBlocks blocks={stack.blocks} />
    </group>
  )
}

export default Stack;
