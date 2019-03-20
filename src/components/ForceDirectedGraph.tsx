import ForceGraph from 'force-graph';
import ReactDOM from 'react';
import * as React from 'react'
import { ForceGraph2D } from 'react-force-graph';
import b from '../datasets/miserables.json';
import c from '../datasets/repos.json';

/**
 * Not using this anymore - found react version:
 * https://github.com/vasturiano/react-force-graph
 */

export class ForceDirectedGraph {
  componentDidMount() {

  }

  public renderGraph = (gData: any) => {
    const myGraph = ForceGraph();
    const meElement = document.getElementById("my_container");
    if (meElement) {
      // myGraph(meElement)
      //   .graphData(gData)
      //   .width(600)
      //   .height(600)
      // myGraph(meElement)
      //   .graphData(c)
      //   .nodeId('id')
      //   .width(600)
      //   .height(600)
      //   .linkDirectionalParticles("value")
      //   .linkDirectionalParticleSpeed(d => d.value * 0.001)
      //   .nodeAutoColorBy('group')
      //   .nodeCanvasObject((node, ctx, globalScale) => {
      //     const label = node.id;
      //     const fontSize = 12/globalScale;
      //     ctx.font = `${fontSize}px Sans-Serif`;
      //     const textWidth = ctx.measureText(label).width;
      //     const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
      //
      //     ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      //     ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      //
      //     ctx.textAlign = 'center';
      //     ctx.textBaseline = 'middle';
      //     ctx.fillStyle = node.color;
      //     ctx.fillText(label, node.x, node.y);
      //   })
      //   .onNodeHover(node => meElement.style.cursor = node ? 'pointer' : null)
      //   .onNodeClick(node => {
      //     // Center/zoom on node
      //     myGraph.centerAt(node.x, node.y, 1000);
      //     myGraph.zoom(8, 2000);
      //   });
    }
  }
}