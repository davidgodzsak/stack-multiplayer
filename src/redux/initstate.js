import direction from '../components/3D/utils/coordinatemath'; //direction
import Gradient from '../components/3D/utils/colours';

export default class InitialState{
  constructor(){
    this.offset = 25;
    this.size = 15;
    this.height = 2;
    this.gradient = new Gradient().rnd(5);
    this.gameState = 'WAITING';
    this.speed = 0.7;
  }

  generate(){
    let state = {
      gameState: this.gameState,
      speed: this.speed,
      gradient: this.gradient,
      bg:{
        topLeft:0xff88aa,
        topRight:0xf877aa,
        bottomLeft:0xf888dd,
        bottomRight:0xff99dd
      },
      player:{
        active:0,
        players:[{
          id:0,
          name:'david',
          points:0
        },{
          id:1,
          name:'not david',
          points:0
        }]
      },
      stack:{
        active:{
          direction: direction('z',1),
          size: {x:this.size,y:this.height,z:this.size},
          center:{x:0,y:this.height*3,z:-this.offset},
          colour: this.gradient[1]
        },
        blocks:[
                {
                  size: {x:this.size,y:this.height*20,z:this.size},
                  center: {x:0,y:-15,z:0},
                  colour: this.gradient[0]
                }
              ],
        falling:[]
      }

    };

    this.gradient.splice(0,1);
    return state;
  }
}

export const sampleState = {
  gameState: 'WAITING',
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
      direction:{x:0,y:0,z:1},
      size:{x:15,y:2,z:15},
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
  }
};
