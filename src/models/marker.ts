export enum MarkerType {
  text = "text",
  image = "image",
  ad = "ad",
}

export interface MarkerBase {
  type: MarkerType;
  start: number;
  duration: number;
  status: string;
}

export interface AdMarker extends MarkerBase {
  content: string;
  link: string;
}

export interface TextMarker extends MarkerBase {
  content: string;
}

export interface ImageMarker extends MarkerBase {
  content: string;
}

export type MarkerResponseItem = AdMarker | TextMarker | ImageMarker;
