import InitialState from './initstate';
import Gradient from '../components/3D/utils/colours';
import rnd from '../components/3D/utils/rnd';
import * as coord from '../components/3D/utils/coordinatemath';
import direction from '../components/3D/utils/coordinatemath';


//------------------------------------------------------------------------------reducer

let init = new InitialState().generate();

export default function reducer(state = init, action) {
  switch (action.type) {
      case 'JOIN_GAME':
        return joinGame(state);
      case 'JOIN_ACCEPTED':
        return joinAccepted(state, action.payload);
      case 'START_GAME':
        return moveBlock(state);
      case 'MOVE_BLOCK':
        return moveBlock(state);
      case 'NEW_BLOCK':
        return newBlock(state, action.payload);
      case 'SERVER_NEW_BLOCK':
        return newBlock(state, action.payload);
      case 'GAME_OVER':
        return gameOver(state);
      case 'SHARE_GRADIENT':
        return state;
      case 'SET_GRADIENT':
        return setGradient(state, action.payload);
  }
  return state;
}

//------------------------------------------------------------------------------reducer functions logic
function joinGame(state){
  return {state,gameState:'JOINING'};
}

function joinAccepted(state,payload){
  let newState = {...payload,gameState:'WAITING'};
  return newState;
}

function newBlock(state,active) {
  //gradient
  let gradState={...state,gradient:rndGradient(state)};

  //new block
  let last = lastBlock(state);
  let newStack = {};
  if(difference(last,active)>last.size.z&&gradState.player.active==0){
    return {...gradState, stack:newStack, gameState:'GAME_OVER'}
  } else if(difference(last,active)>last.size.x&&gradState.player.active==1){
    return {...gradState, stack:newStack, gameState:'GAME_OVER'}
  }else {
    gradState.player.players[gradState.player.active].points++;
  }

  if(difference(last,active)<1){
    newStack = exact(gradState,active);
  } else {
    //change player
    gradState.player.active = changePlayer(gradState.player);
    newStack = cut(gradState,active);
  }

  //push
  return {...gradState, stack:newStack,gameState:'PLACING'}
}

function moveBlock(state){
  return {...state,gameState:'MOVING'}
}

function setGradient(state,grad){
  return {...state,gradient:grad};
}

//------------------------------------------------------------------------------helper function
function exact(state,active){
  let last = lastBlock(state);
  let newLast = {...active};
  newLast.center.x=last.center.x;
  newLast.center.z=last.center.z;

  let newBlocks = [...state.stack.blocks,newLast];

  let newActive = {
    size:{...newLast.size},
    colour:state.gradient[0],
  };

  if(state.player.active === state.player.players[0].id){
    newActive.center = {x:newLast.center.x,y:newLast.center.y+2,z:-25};
    newActive.direction = direction('z',1);
  }else{
    newActive.center = {x:-25,y:newLast.center.y+2,z:newLast.center.z};
    newActive.direction = direction('x',1);
  }

  return ({
    active:newActive,
    blocks:newBlocks
  });
};

function cut(state,active){
  let last = lastBlock(state);
  let cutBlock = {...active};
  let distance = coord.distanceOfCoordinates(last.center,active.center);

  cutBlock.size = coord.minusCoordinates(last.size,distance);
  cutBlock.size.y = active.size.y;

  cutBlock.center=coord.addCoordinatesBalanced(cutBlock.center,coord.minusCoordinates(last.center,active.center),0.5);
  cutBlock.center.y=active.center.y;

  let newBlocks = [...state.stack.blocks,cutBlock];

  let newActive = {
    size:{...cutBlock.size},
    colour:state.gradient[0],
  }

  if(state.player.active === state.player.players[0].id){
    newActive.center = {x:cutBlock.center.x,y:cutBlock.center.y+2,z:-25};
    newActive.direction = direction('z',1);
  }else{
    newActive.center = {x:-25,y:cutBlock.center.y+2,z:cutBlock.center.z};
    newActive.direction = direction('x',1);
  }

  return ({
    active:newActive,
    blocks:newBlocks
  });
};


function rndGradient(state){
  let newGradient =[...state.gradient];
  newGradient.splice(0,1);
  if (newGradient.length===1){
    let size =  rnd(10)+3;
    newGradient = new Gradient(newGradient[0]).rnd(size);
  };

  return newGradient;
}
function lastBlock(state){
  return state.stack.blocks[state.stack.blocks.length-1];
}

function changePlayer(player){
  if(player.active===player.players[0].id)
    return player.players[1].id
  return player.players[0].id;
}

function difference(a,b){
  return Math.abs(a.center.x+a.center.z-b.center.z-b.center.x);
}
