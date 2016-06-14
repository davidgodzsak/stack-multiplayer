import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import GameView from './gameview';

const App = (props) => (
      <div>
        <h1>Stacks</h1>
        <button disabled={props.gameState !== 'MENU' ? true : false} onClick={()=>props.actions.joinGame(props)}>JOIN GAME</button>
        <p>{props.gameState}</p>
        <p style={{position:'fixed', top:'50px', left:'50px'}}>{props.player.players[0].name}: {props.player.players[0].points}</p>
        <p style={{position:'fixed', top:'50px', right:'50px'}}>{props.player.players[1].name}: {props.player.players[1].points}</p>
        <div style={props.gameState === 'MENU'  ?
                        {filter: 'blur(15px)'} :
                        props.gameState === 'WAITING'  ?
                            {filter: 'blur(5px)'} :
                            props.player.active !== props.player.myId ?
                                {filter: 'blur(5px)',transition: 'all 2s ease-in-out'} :
                                {transition: 'all 0.5s ease-in-out'}}>
          <GameView {...props} />
        </div>
      </div>
);

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
