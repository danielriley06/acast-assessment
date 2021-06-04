import { find, isEmpty, omit } from "lodash";
import { EpisodeResponseItem } from "models/episode";
import { httpClient } from "utils/asyncUtils";
import { Machine, assign, spawn } from "xstate";
import { createEpisodeDataMachine } from "./episodeDataMachine";

const episodesURI = "http://localhost:1337";

export interface EpisodesContext {
  episodes: EpisodeResponseItem[];
  currentEpisode: EpisodeResponseItem | null;
}

export interface EpisodesStateSchema {
  states: {
    idle: {
      states: {
        loading: Record<string, unknown>;
        loaded: Record<string, unknown>;
        failure: Record<string, unknown>;
      };
    };
    selected: Record<string, unknown>;
  };
}

type SuccessEvent = {
  type: "SUCCESS";
  results: EpisodeResponseItem[];
  pageData: Record<string, unknown>;
};
type FailureEvent = { type: "FAILURE"; message: string };
type SelectEvent = { type: "SELECT"; episodeId: string };
type RetryEvent = { type: "RETRY" };
export type EpisodesEvents =
  | { type: "FETCH" }
  | SuccessEvent
  | FailureEvent
  | RetryEvent
  | SelectEvent;

export const episodesMachine = Machine<EpisodesContext, EpisodesStateSchema, EpisodesEvents>(
  {
    id: "episodes-machine",
    initial: "idle",
    context: {
      episodes: [],
      currentEpisode: null,
    },
    states: {
      idle: {
        initial: "loading",
        states: {
          loading: {
            invoke: {
              id: "fetch-episodes",
              src: "getListEpisodes",
              onDone: {
                target: "loaded",
                actions: assign({
                  episodes: (_, event) => event.data,
                }),
              },
              onError: {
                target: "failure",
              },
            },
          },
          loaded: {
            type: "final",
          },
          failure: {
            on: {
              RETRY: "loading",
            },
          },
        },
      },
      selected: {},
    },
    on: {
      SELECT: {
        target: ".selected",
        actions: assign({
          currentEpisode: ({ episodes }, event) => find(episodes, { id: event.episodeId }) ?? null,
        }),
      },
    },
  },
  {
    services: {
      getListEpisodes: async (ctx, event: any) => {
        const resp = await httpClient.get(`http://localhost:1337/episodes`);
        console.log(resp.data);
        return resp.data;
      },
    },
  }
);
