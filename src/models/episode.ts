import { MarkerResponseItem } from "./marker";

export interface Episode {
  id: string;
  audio: string;
  name: string;
}

export interface EpisodeResponseItem extends Episode {
  markers: MarkerResponseItem[];
}
