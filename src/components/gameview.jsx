import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

import Camera from './3D/camera';
import Lights from './3D/lights';
import Stack from './3D/stack';
import BackGround from './3D/background'

const GameView = (props) => {
  console.log(props, "asd");
  const size = {width:window.innerWidth, height:window.innerHeight};

  return(
      <React3
              mainCamera="camera2"
              width={size.width}
              height={size.height}
              alpha
              shadowMapEnabled
              antialias
      >
        <scene>
          <Camera yPos={2}
                  width={size.width}
                  height={size.height}/>
          <Lights lights={props} />
          <Stack stack={props.stack} />
          <BackGround colors={props.bg}/>
        </scene>
      </React3>

  )
}

export default GameView;
