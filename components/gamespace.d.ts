interface IDungeon {
  [property: string]: {
    x: number;
    y: number;
    radius: number;
    fill: string;
  }
}
interface ITile {
  x: number,
  y: number,
  radius: number,
  fill: string
}
