import * as React from 'react';
//import ForceGraph2D from 'react-force-graph';
import {d3Graph} from '../common/Structure';


const randomData = require('../datasets/random-data');
const fdg = require('react-force-graph');

interface Props {
  width: number;
  height: number;
}

export class ForceDirectedGraph extends React.Component<Props, {}> {
  simulation: any;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    console.log('did mount');
  }

  render() {
    const { width, height } = this.props;
    return (
      <fdg.ForceGraph2D
        graphData={randomData.genRandomTree(20)}
      />
    );
  }
}