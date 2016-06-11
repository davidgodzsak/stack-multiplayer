export default function direction(a,b){
  if(a == 'x')
    return ({x:b,y:0,z:0});
  if(a == 'z')
    return ({x:0,y:0,z:b});
};

export const addCoordinatesBalanced = (a,b,c) => ({x:a.x+b.x*c, y:a.y+b.y*c, z:a.z+b.z*c});

export const multiplyCoordinates = (a,b) => ({x:a.x*b,y:a.y*b,z:a.z*b});

export const distanceOfCoordinates = (a,b) => ({x:Math.abs(a.x-b.x), y:Math.abs(a.y-b.y), z:Math.abs(a.z-b.z)});

export const minusCoordinates = (a,b) => ({x:a.x-b.x, y:a.y-b.y, z:a.z-b.z});
