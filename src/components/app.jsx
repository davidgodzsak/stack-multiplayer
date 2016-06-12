import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import GameView from './gameview';

const App = (props) => (
      <div>
        <h1>Stacks</h1>
        <button onClick={()=>props.actions.joinGame(props)}>JOIN GAME</button>
        <p>{props.gameState}</p>
        <p style={{position:'fixed', top:'50px', left:'50px'}}>{props.player.players[0].name}: {props.player.players[0].points}</p>
        <p style={{position:'fixed', top:'50px', right:'50px'}}>{props.player.players[1].name}: {props.player.players[1].points}</p>
        <GameView {...props}  style={{background:'linear-gradient:(red,yellow)'}}/>
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
