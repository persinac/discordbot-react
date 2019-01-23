import * as React from 'react';
import * as d3 from 'd3';

interface Props {
  id: string;
  data: number[];
  height: number;
  width: number;
};

interface State {
  data: number[];
  height: number;
  width: number;
};

const getInitialData = (props: Props) => props.data ? props.data : [1,2,3,4,5];
const getInitialHeight = (props: Props) => props.height ? props.height : 500;
const getInitialWidth = (props: Props) => props.width ? props.width : 300;

export class BarChart extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      data: getInitialData(props),
      height: getInitialHeight(props),
      width: getInitialWidth(props)
    }
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart = () => {
    const {data, height, width} = this.state;

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 100);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => height - (10 * d) - 3)
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}