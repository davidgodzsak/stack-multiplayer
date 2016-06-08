import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';


//TODO: set up cameras properly with parameters


const Camera = (props) => (
  <group>
    <perspectiveCamera
      name="camera"
      fov={100}
      aspect={props.width/props.height}
      near={0.1}
      far={10000}
      position={new THREE.Vector3(-20,15,20)}
      lookAt={new THREE.Vector3(0,0,0)}
    />
    <orthographicCamera
      name="camera2"
      left = {props.width/-18}
      right = {props.width/18}
      top = {props.height/18}
      bottom = {props.height/-18}
      position = {new THREE.Vector3(25,20,25)}
      lookAt={new THREE.Vector3(0,0,0)}
      near={0.1}
      far={1000}
    />
  </group>
);

export default Camera;
