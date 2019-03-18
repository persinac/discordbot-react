import ForceGraph from 'force-graph';
import * as React from 'react'

export class ForceDirectedGraph {
  componentDidMount() {
    console.log('did mount');
  }

  public renderGraph = (gData: any) => {
    const myGraph = ForceGraph();
    const meElement = document.getElementById("my_container");
    if (meElement) {
      myGraph(meElement)
        .graphData(gData)
        .width(600)
        .height(600)
    }
  }
}