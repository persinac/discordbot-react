export interface RageQuitter {
  id: number;
  player: string;
  reporter: string;
  reported_on: Date;
}

export interface RageQuitterCounterView {
  player: string;
  reported_on: string;
  counter: number;
}

export type d3Node = {
  id: string;
  group: number;
  x: number;
  y: number;
  fx: number;
  fy: number;
};

export type d3Link = {
  source: string,
  target: string,
  value: number
};

export type d3Graph = {
  nodes: d3Node[],
  links: d3Link[]
};