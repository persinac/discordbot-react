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