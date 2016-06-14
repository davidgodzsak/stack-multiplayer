import rnd from './rnd';

export default class Gradient{
  constructor(from = rndColour()){
    if(from instanceof Array){
      this.from = from;
    } else {
      this.from = from.split('(')[1].split(',').map((a)=>parseInt(a));
    }
    this.to = rndColour();
  }

  rnd(a){
    let colours=[];
    for(let i=0;i<a;i++){
      let r = this.from[0]+Math.floor((this.to[0]-this.from[0])/a*i);
      let g = this.from[1]+Math.floor((this.to[1]-this.from[1])/a*i);
      let b = this.from[2]+Math.floor((this.to[2]-this.from[2])/a*i);
      colours.push(rgb(r,g,b));
    }
    return colours;
  }
}

function rgb(r,g,b){
  return "rgb("+r+','+g+','+b+")";
}

function rndColour(){
  return [rnd(256),rnd(256),rnd(256)];
}
