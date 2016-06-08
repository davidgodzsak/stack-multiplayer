import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

export default class GameView extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.lightPosition = new THREE.Vector3(0, 5, 20);
    this.lightTarget = new THREE.Vector3(0, 0, 0);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.01,
          this.state.cubeRotation.y + 0.01,
          0
        ),

        position: new THREE.Vector3(Math.sin(new Date()*0.001)*20,0,0)
      });
    };
  }

  render() {

    const {
      width =  window.innerWidth,
      height = window.innerHeight
    } = this.props;

    // or you can use:
    // width = window.innerWidth
    // height = window.innerHeight

    return (

      <React3
      mainCamera="camera2"
      width={width}
      height={height}
      alpha={1}

      antialias

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={new THREE.Vector3(-15,4,15)}
          lookAt={new THREE.Vector3(0,0,0)}
        />
        <orthographicCamera
          name="camera2"
          left = {width/-18}
          right = {width/18}
          top = {height/18}
          bottom = {height/-18}
          position = {new THREE.Vector3(15,10,15)}
          lookAt={new THREE.Vector3(0,0,0)}
          near={0.1}
          far={1000}
        />
        <ambientLight
            color={0x505050}
            intensity={0.1}
          />
          <spotLight
            color={0xaaaaff}
            intensity={1.2}
            position={new THREE.Vector3(0, 15, 50)}
            lookAt={this.lightTarget}

            castShadow
            shadowCameraNear={200}
            shadowCameraFar={10000}
            shadowCameraFov={50}

            shadowBias={-0.00022}

            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <spotLight
            color={0xffaa55}
            intensity={1.2}
            position={new THREE.Vector3(-50, 15, 0)}
            lookAt={this.lightTarget}

            castShadow
            shadowCameraNear={200}
            shadowCameraFar={10000}
            shadowCameraFov={50}

            shadowBias={-0.00022}

            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
        <mesh
          position={this.state.position}

            recieveShadow
            castShadow
        >
          <boxGeometry
            recieveShadow
            castShadow
            width={15}
            height={2}
            depth={15}

          />
          <meshLambertMaterial
            color={0xaaaaff}
          />
        </mesh>
        <mesh
        recieveShadow
        position={new THREE.Vector3(0,-3,0)}
        >
          <boxGeometry
            recieveShadow
            width={15}
            height={4}
            depth={15}

          />
          <meshLambertMaterial
            color={0xaaffff}
          />
        </mesh>
      </scene>
    </React3>


    );
  }
}
