import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import GameView from './gameview';


var filter15={
  filter:'blur(15px)',
  WebkitFilter:'blur(15px)'
};

var filter5={
  filter:'blur(5px)',
  WebkitFilter:'blur(5px)'
}

var transition2={
  	transition: 'all 2s ease-in-out',
    WebkitTransition: 'all 2s ease-in-out'
}
var transition05={
  	transition: 'all 2s ease-in-out',
    WebkitTransition: 'all 2s ease-in-out'
}

const App = (props) => (
      <div>
        <h1>Stacks</h1>
        <button disabled={props.gameState !== 'MENU' ? true : false} onClick={()=>props.actions.joinGame(props)}>JOIN GAME</button>
        <p>{props.gameState}</p>
        <p style={{position:'fixed', top:'50px', left:'50px'}}>{props.player.players[0].name}: {props.player.players[0].points}</p>
        <p style={{position:'fixed', top:'50px', right:'50px'}}>{props.player.players[1].name}: {props.player.players[1].points}</p>
        <div style={props.gameState === 'MENU'  ?
                        {filter15} :
                        props.gameState === 'WAITING'  ?
                            {...filter5,...transition2} :
                            props.player.active !== props.player.myId ?
                                {...filter5,...transition2} :
                                {...transition05}}>
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
