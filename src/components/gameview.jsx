import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';

import Camera from './3D/camera';
import Lights from './3D/lights';
import Stack from './3D/stack';
import BackGround from './3D/background';

import * as utils from './3D/utils/coordinatemath';


export default class GameView extends React.Component {
  constructor(props){
    super(props);

    this.state={
      active:this.props.stack.active,
    }
    this.size = {width:window.innerWidth, height:window.innerHeight};


    document.addEventListener('keydown',(event)=>{
      const keyName = event.key;
      if (keyName === ' ') {
        // if(this.props.gameState==='WAITING'){
        //   this.props.actions.startGame();
        // }else
        if(this.props.gameState === 'MOVING'){
          this.props.actions.newBlock({...this.state.active});
        }
      }
    });
  }

  _onAnimate = () => {
    if(this.props.gameState === 'PLACING'){
      this.state={
        active:this.props.stack.active
      }
      this.props.actions.moveBlock();
    }
    if(this.props.gameState === 'MOVING'){
      if(this.state.active.center.z>=25&&this.state.active.direction.z==1){
        let newDirection = utils.multiplyCoordinates(this.state.active.direction,-1);
        this.setState({active:{...this.state.active,direction:newDirection}});
      } else if(this.state.active.center.z<=-25&&this.state.active.direction.z==-1){
        let newDirection = utils.multiplyCoordinates(this.state.active.direction,-1);
        this.setState({active:{...this.state.active,direction:newDirection}});
      } else if(this.state.active.center.x>=25&&this.state.active.direction.x==1){
        let newDirection = utils.multiplyCoordinates(this.state.active.direction,-1);
        this.setState({active:{...this.state.active,direction:newDirection}});
      } else if(this.state.active.center.x<=-25&&this.state.active.direction.x==-1){
        let newDirection = utils.multiplyCoordinates(this.state.active.direction,-1);
        this.setState({active:{...this.state.active,direction:newDirection}});
      } else {
        let newCenter = utils.addCoordinatesBalanced(this.state.active.center,this.state.active.direction,0.6);
        this.setState({active:{...this.state.active,center:newCenter}});
      }
    }
  }


  render(){


    return(
        <React3
                mainCamera="camera2"
                width={this.size.width}
                height={this.size.height}
                alpha
                antialias

                onAnimate={this._onAnimate}>
          <scene>
            <Camera yPos={(this.props.stack.blocks.length-1)*this.props.stack.active.size.y}
                    width={this.size.width}
                    height={this.size.height}/>
            <Lights lights={this.prop} yPos={this.props.stack.blocks.length*this.props.stack.active.size.y} />
            <Stack still={this.props.stack.blocks} active={this.state.active} />
            <BackGround colors={this.props.bg} yPos={this.props.stack.blocks.length*this.props.stack.active.size.y} />
          </scene>
        </React3>
    )
  }
};
