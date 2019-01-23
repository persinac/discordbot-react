import React, { Component } from 'react';
import {RageQuitter, RageQuitterCounterView} from './common/Structure';
import {BarChart} from './components/BarChart';
import './App.css';

class App extends Component {
  state = {
    rageQuitters: [],
    rageQuitter: {
      id: 0,
      player: '',
      reporter: '',
      reported_on: new Date()
    },
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: 'root'
  }

  public componentDidMount(): void {
    this.getRageQuitters()
  }

  private getRageQuitters = (): void => {
    fetch('http://localhost:48330/rager/list')
      .then(resp => resp.json())
      .then(data => this.setState({ rageQuitters: data }))
      .catch(function(err) { console.log(err); })
  };

  private renderRager = (rq: RageQuitterCounterView) => {
    return <div key={rq.player}>{rq.player} | {rq.counter} | {rq.reported_on}</div>
  };

  private addUser = (newRQ: RageQuitter) => {
    const postData = { method: 'POST' };
    fetch(`http://localhost:48330/rager/new/${newRQ.player}&${newRQ.reporter}`, postData)
      .then(this.getRageQuitters)
      .catch( err => console.log(err))
  }

  render() {
    const { rageQuitters, rageQuitter } = this.state
    return (
      <div className="App">
        {rageQuitters.map(this.renderRager)}
        <div>
          <input
            value={rageQuitter.player}
            onChange={e => this.setState({ rageQuitter: {...rageQuitter, player:e.target.value}})} />
          <input
            value={rageQuitter.reporter}
            onChange={e => this.setState({ rageQuitter: {...rageQuitter, reporter:e.target.value}})} />
          <button onClick={() => this.addUser(this.state.rageQuitter)}>New Rager</button>
        </div>
        <BarChart id={this.state.id} data={this.state.data} height={this.state.height} width={this.state.width}/>
      </div>
    );
  }
}

export default App;
