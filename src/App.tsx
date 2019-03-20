import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {RageQuitter, RageQuitterCounterView} from './common/Structure';
import './App.css';
import {ForceDirectedGraph} from './components/ForceDirectedGraph';
import { ForceGraph2D } from 'react-force-graph';
import c from './datasets/repos.json';

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

  public buildRandomData() {
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
    return gData;
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
      <Container id="my_container">
        <ForceGraph2D
          graphData={c}
          width={600}
          height={600}
          nodeId="id"
          linkDirectionalParticles="value"
          linkDirectionalParticleSpeed={d => d.value * 0.001}
          nodeAutoColorBy={"group"}
          nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 12/globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              // ctx.fillStyle = node.color;
              ctx.fillStyle = 'midnightBlue';
              // console.log(node.color);
              ctx.fillText(label, node.x, node.y);
            }
          }
        />
      </Container>
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
