import * as React from "react";
import * as d3 from "d3";
import {d3Node} from '../common/Structure';
import * as d3Drag from 'd3-drag';

/****
 * Reference notes:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/d3-drag/d3-drag-tests.ts
 * https://stackoverflow.com/questions/44599129/d3-v4-typescript-definitelytyped-angular2-line-with-scaletime-on-the-x-axis
 * https://stackoverflow.com/questions/44472945/d3-js-and-typescript-compilation-error
 * 
 */
interface CircleDatum {
  nodeId: string;
  name: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
}

class Node extends React.Component<{ node: d3Node, color: string }, {}> {
  ref!: SVGCircleElement;

  componentDidMount() {
    d3.select(this.ref).data([this.props.node]);
  }

  render() {
    return (
      <circle className="node" r={5} fill={this.props.color}
              ref={(ref: SVGCircleElement) => this.ref = ref}>
        <title>{this.props.node.id}</title>
      </circle>
    );
  }
}

export class Nodes extends React.Component<{ nodes: d3Node[], simulation: any }, {}> {
  componentDidMount() {
    const simulation = this.props.simulation;
    let circleDrag: d3Drag.DragBehavior<SVGCircleElement, CircleDatum, CircleDatum | d3Drag.SubjectPosition>;
    circleDrag = d3Drag.drag<SVGCircleElement, CircleDatum>(); // Use short form method
  }

  render() {
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const nodes = this.props.nodes.map((node: d3Node, index: number) => {
      return <Node key={index} node={node} color={color(node.group.toString())} />;
    });

    return (
      <g className="nodes">
        {nodes}
      </g>
    );
  }
}