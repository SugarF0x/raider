interface Chain {
  type:  TileType;
  array: number[]; // contain Tile ids
}

interface TileState {
  health: number;
  armor:  number;
  attack: number;
}

// tile type can only equal to one of these
type TileType = 'coin' | 'skull' | 'potion' | 'sword' | 'shield' | 'boss';

class Tile {
  type: TileType;
  isSelected = false;
  id = Math.floor(Math.random()*1000);

  constructor(type: TileType) {
    this.type = type;
  }

  drag(chain: Chain) {
    if (chain.type === this.type) {

    }
  }
}

class Skull extends Tile {
  state: TileState;
  base:  TileState;

  constructor(state: TileState) {
    super('skull');

    this.base  = state;
    this.state = state;
  }
}
