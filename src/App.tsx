import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {RageQuitter, RageQuitterCounterView} from './common/Structure';
import './App.css';
import {ForceDirectedGraph} from './components/ForceDirectedGraph';

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
    const N = 50;
    const gData: any = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };
    this.getRageQuitters()
    const fdg = new ForceDirectedGraph();
    fdg.renderGraph(gData)
  }

  private getRageQuitters = (): void => {
    fetch('http://localhost:48330/rager/list')
      .then(resp => resp.json())
      .then(data => this.setState(
        {
          rageQuitters: data as RageQuitterCounterView,
          data: data.counter
        })
      )
      .catch(function(err) { console.log(err); })
  };

  private renderRager = (rq: RageQuitterCounterView) => {
    return <div key={rq.player}>{rq.player} | {rq.counter} | {rq.reported_on}</div>
  };

  private renderRagerTwo = (rq: RageQuitterCounterView[]) => {
    let tableRows = [] as any;
    rq.forEach((e)=>{
      tableRows.push(this.tableRowElement(e))
    });
    console.log(tableRows);
    return <table>
      <thead>
      <tr>
        <td>Player</td>
        <td>Count</td>
        <td>Last Reported</td>
      </tr>
      </thead>
      <tbody>
      {tableRows}
      </tbody>
    </table>;
  };

  private tableRowElement = (rq: RageQuitterCounterView) => {
    return <tr>
      {this.buildDataForRow(rq.player)}
      {this.buildDataForRow(rq.counter.toString())}
      {this.buildDataForRow(rq.reported_on.toString())}
      </tr>
  };

  private buildDataForRow = (value: String) => {
    return <td>{value}</td>
  };

  private addRageQuitter = (newRQ: RageQuitter) => {
    const postData = { method: 'POST' };
    fetch(`http://localhost:48330/rager/new/${newRQ.player}&${newRQ.reporter}`, postData)
      .then(this.getRageQuitters)
      .catch( err => console.log(err))
  }

  private resetRageQuitter = () => {
    this.setState({
      rageQuitter: {
        player: '',
        reporter: '',
        reported_on: new Date()
      }
    });
  };

  render() {
    const { rageQuitters } = this.state
    this.renderRagerTwo(rageQuitters);
    return (<div className="App full_height_width" id="my_div">
      <Container>
        <Row className="justify-content-md-center">
          <Col>{this.renderRagerTwo(rageQuitters)}</Col>
          <Col>{this.renderRagerTwo(rageQuitters)}</Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>{this.renderRagerTwo(rageQuitters)}</Col>
          <Col>{this.renderRagerTwo(rageQuitters)}</Col>
          <Col>{this.renderRagerTwo(rageQuitters)}</Col>
        </Row>
      </Container>
      <Container id="my_container"/>
      {/*<div>*/}
      {/*<label>Player: </label>*/}
      {/*<input*/}
      {/*value={this.state.rageQuitter.player}*/}
      {/*onChange={e => this.setState({ rageQuitter: {...rageQuitter, player:e.target.value}})}*/}
      {/*/>*/}
      {/*<label>Reporter: </label>*/}
      {/*<input*/}
      {/*value={this.state.rageQuitter.reporter}*/}
      {/*onChange={e => this.setState({ rageQuitter: {...rageQuitter, reporter:e.target.value}})}*/}
      {/*/>*/}
      {/*<button onClick={() => {*/}
      {/*this.addUser(this.state.rageQuitter);*/}
      {/*this.resetRageQuitter();*/}
      {/*}}>New Rager</button>*/}
      {/*</div>*/}
    </div>)

  }
}

export default App;
