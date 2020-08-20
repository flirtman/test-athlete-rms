import React, {Component} from 'react';
import Player from './components/Player';
import swal from 'sweetalert';

import './styles.scss';

import rock from './assets/rock.png';
import paper from './assets/paper.png';
import scissors from './assets/scissors.png';
import robotRendom from './assets/robo-rendom.png';
import robotTactic from './assets/robot-tactic.png';


const weapons = ["rock", "paper", "scissors"];
const rendomeWeapon = () => weapons[Math.floor(Math.random() * weapons.length)];


const initState = {
  playerOneWeapon: weapons[0],
  playerRobotWeapon: weapons[0], 
  playerOne: "Ilia Svinin",
  winner: "",
  playerOneWin: 0,
  playerRobotWin: 0, 
  gameCounter: 0,
  tieCounter: 0,
  robotActive: "Robot Rendom",
  robotTacticLastChoice: rendomeWeapon()
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initState;

    this.startGame = this.startGame.bind(this);
    this.selectWinner = this.selectWinner.bind(this);
    this.selectWeapon = this.selectWeapon.bind(this); 
    this.winsCounter = this.winsCounter.bind(this);
    this.endGame = this.endGame.bind(this); 
    this.resetTheGame = this.resetTheGame.bind(this); 
    this.selectRobot = this.selectRobot.bind(this);
  }


  startGame = () => {
    let gameInterval = setInterval(() => {
      
      if(this.state.robotActive === 'Robot Rendom') {
        this.setState({
          playerRobotWeapon: rendomeWeapon(),
          winner: ""
        });
      }


      if(this.state.robotActive === 'Robot Tactic') {
        this.setState({
          playerRobotWeapon: this.state.robotTacticLastChoice,
          winner: ""
        });
      }

      let nextTactic;
      switch(this.state.robotTacticLastChoice) {
        case 'rock' : nextTactic = 'paper';
         break;
        case 'paper' : nextTactic = 'scissors';
          break;
        case 'scissors' : nextTactic = 'rock';
         break;
        default : 
          nextTactic = this.state.robotTacticLastChoice;
      }
      this.setState({robotTacticLastChoice: nextTactic})

       
      
      clearInterval(gameInterval);

      const selectWinner = this.selectWinner();

      this.setState({
        winner: selectWinner
      });
    
      const gameNumb = this.state.gameCounter;
      
      if(selectWinner !== 'tie')
      this.setState({
        gameCounter: gameNumb + 1
      });

      this.winsCounter(selectWinner);
       
      this.endGame() 

    }, 100);
  };

  

  selectWinner = () => {

    if (this.state.playerOneWeapon === this.state.playerRobotWeapon) {
      return "tie";
    } else if (
      (this.state.playerOneWeapon === "rock" && this.state.playerRobotWeapon === "scissors") ||
      (this.state.playerOneWeapon === "scissors" && this.state.playerRobotWeapon === "paper") ||
      (this.state.playerOneWeapon === "paper" && this.state.playerRobotWeapon === "rock")
    ) { 
      return this.state.playerOne;
    } else { 
      return this.state.robotActive;
    }     
  };

  winsCounter = (selectWinner) => {

    if(selectWinner === this.state.playerOne) {
      this.setState({playerOneWin: this.state.playerOneWin + 1})
    }
    else if (selectWinner === this.state.robotActive) {
      this.setState({playerRobotWin: this.state.playerRobotWin + 1}) 
    }
    else {
      this.setState({tieCounter: this.state.tieCounter + 1}) 
    }

    this.endGame()
  }
  
  selectWeapon = weapon => {
    this.setState({
      playerOneWeapon: weapon,
      winner: ""
    });
  };

  endGame = () => {
   
    if(this.state.gameCounter >= 2 && (this.state.playerOneWin >= 2 || this.state.playerRobotWin >= 2)) { 
      swal(`${this.state.winner} Won!`, `Match is over ${this.state.playerOneWin} - ${this.state.playerRobotWin}`, "success");

      this.resetTheGame();
    }
  }
 

  resetTheGame = () => {
    this.setState(initState);
  }

  selectRobot = (robotSelected) => {
    this.setState({robotActive: robotSelected});
  }

  robotTacticAlgo = () => {

  }

  render() {
    const { playerOne, playerRobot, winner } = this.state; 

    return (
      <>
        <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
        
        <div className="information-display">
          <div className="information-display-unit">Games played: {this.state.gameCounter}</div>
          <div className="information-display-unit">Player one win: {this.state.playerOneWin}</div>
          <div className="information-display-unit">Player robot win: {this.state.playerRobotWin}</div>
          <div className="information-display-unit">Tie: {this.state.tieCounter}</div>
        </div>

        <div className="players-display">
            
            <div className="player-wrap">
              <Player weapon={this.state.playerOneWeapon} />
              <div className="player-name">Ilia Svinin</div>

              <div className="weapon-selection">
                
                <button className="weaponBtn" onClick={() => this.selectWeapon("rock")}>
                  <img src={rock} alt="rock"/>
                </button>

                <button className="weaponBtn"onClick={() => this.selectWeapon("paper")}>
                  <img src={paper} alt="paper"/>
                </button>

                <button className="weaponBtn" onClick={() => this.selectWeapon("scissors")}>
                  <img src={scissors} alt="scissors"/>
                </button>

              </div>  
            </div>

            <div className="vs-space">VS</div>
            <div className="player-wrap">
              <Player weapon={this.state.playerRobotWeapon} />
              <div className="player-name">{this.state.robotActive}</div>
              
              <div className="robot-selection">
                <button className="robotBtn" onClick={() => this.selectRobot("Robot Rendom")}>
                  <img src={robotRendom} alt="robot rendom"/>
                </button>

                <button className="robotBtn"  onClick={() => this.selectRobot("Robot Tactic")}>
                  <img src={robotTactic} alt="robot tactic"/>
                </button>

              </div>
            </div>
            
        </div>

        <div className="buttons-section">
          <button type="button" onClick={this.startGame}>
            Go!
          </button>
        </div>
      </>
    );
  }
}

export default App;
