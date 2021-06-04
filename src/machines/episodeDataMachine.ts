import { EpisodeResponseItem } from "models/episode";
import { Machine, assign } from "xstate";

const url = "http://localhost:1337";

export interface EpisodeDataContext {
  episodeId: string;
  episodeData?: EpisodeResponseItem;
  playStatus?: string;
}

const invokeFetchEpisode = (episode) => {
  let changedUrl = url;

  if (episode !== undefined) {
    changedUrl = `${url}/episodes/${episode.id}`;
  }

  return fetch(changedUrl).then((response) => response.json());
};

export const createEpisodeDataMachine = (episodeId: string) =>
  Machine<EpisodeDataContext, any, any>(
    {
      id: "episode-data",
      initial: "loading",
      context: {
        episodeId,
      },
      states: {
        loading: {
          invoke: {
            id: "fetch-episode-data",
            src: "getEpisodeDetails",
            onDone: {
              target: "loaded",
              actions: assign({
                episodeData: (context, event) => event.data,
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
    {
      services: {
        getEpisodeDetails: (context, event) => invokeFetchEpisode(context.episodeId),
      },
    }
  );
