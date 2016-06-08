const initialState = {
  speed: 1,
  gradient: [0xaabbcc,0xaabbdd,0xaabbee,0xaabbff,0x99aaff,0x8899ff,0x7788ff,0x6677ff],
  bg:{
    topLeft:0xff88aa,
    topRight:0xf877aa,
    bottomLeft:0xf888dd,
    bottomRight:0xff99dd
  },
  player:{
    active:0,
    players:['player1','player2']
  },
  stack:{
    active:{
      size:{x:15, y:2, z:15},
      center:{x:0,y:12,z:-25},
      colour:0x88eeaa
    },
    blocks:[
      {
        size:{x:15,y:2,z:15},
        center:{x:0,y:10,z:0},
        colour:0x00ffee
      },
      {
        size:{x:15, y:2, z:15},
        center:{x:0, y:8, z:0},
        colour: 0xaaddcc
      },
      {
        size:{x:15, y:2, z:15},
        center:{x:0, y:6, z:0},
        colour: 0xaaeecc
      },
      {
        size:{x:15, y:2, z:15},
        center:{x:0, y:4, z:0},
        colour: 0xaaffcc
      },
      {
        size:{x:15, y:2, z:15},
        center:{x:0, y:2, z:0},
        colour: 0x99eebb
      },
      {
        size:{x:15, y:2, z:15},
        center:{x:0, y:0, z:0},
        colour: 0x88eeaa
      }
    ]
  },
  gameState: 'WAITING'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
     case 'NEW_BLOCK':
        return newBlock(state, action.payload);
     case 'MOVING':
        return movingBlock(state);
  }
  return state;
}


function newBlock(state) {
  return state;
  // if (state.gameState === 'MOVING') {
  //   return state;
  // }
  //
  // if (selectedSoldier.color !== state.playerToTurn) {
  //   return state;
  // }
  //
  // const newState = copy(state);
  //
  // newState.gameState = 'SELECTED';
  // newState.selected = selectedSoldier;
  //
  // return newState;
}

function movingBlock(state){
  return {...state, gameState: 'MOVING'}
}
