export class GameResource {
  name: string;
  detailAttribute: string;

  constructor(name: string, detailAttribute: string) {
    this.name = name;
    this.detailAttribute = detailAttribute;
  }
}

export type GameMode = 'people' | 'starships';

export type GameResourcesByMode = {
  [key in GameMode]: GameResource[];
};
