export function startGame() {
  return {
    type: 'START_GAME'
  };
}

export function newBlock(prop) {
  return {
    type: 'NEW_BLOCK',
    payload:prop
  };
}

export function moveBlock() {
  return {
    type: 'MOVE_BLOCK'
  };
}

export function gameOver() {
  return{
    type: 'GAME_OVER'
  }
}
