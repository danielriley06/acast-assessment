import { useService } from "@xstate/react";
import EpisodeList from "components/EpisodeList";
import EpisodePlayer from "components/EpisodePlayer";
import { isNull } from "lodash";
import { EpisodesContext, EpisodesStateSchema, EpisodesEvents } from "machines/episodesMachine";
import React from "react";
import { Interpreter } from "xstate";

export interface EpisodesContainerProps {
  episodesService: Interpreter<EpisodesContext, EpisodesStateSchema, EpisodesEvents>;
}

const EpisodesContainer: React.FC<EpisodesContainerProps> = ({ episodesService }) => {
  const [currentEpisodes, sendEpisodes] = useService(episodesService);

  const selectEpisode = (episodeId: string) => sendEpisodes({ type: "SELECT", episodeId });

  const isEpisodeSelected = currentEpisodes.context.currentEpisode !== null;

  return (
    <div style={{ display: "flex", height: "calc(100vh - 80px)", justifyContent: "space-between" }}>
      <div
        style={{
          padding: "10px",
          width: "30%",
          background: "#f0f0f0",
        }}
      >
        <h2>Select an episode below</h2>
        <EpisodeList
          episodes={currentEpisodes.context.episodes}
          selectEpisode={selectEpisode}
          currentEpisode={currentEpisodes.context.currentEpisode}
        />
      </div>
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isEpisodeSelected && (
          <EpisodePlayer episodeData={currentEpisodes.context.currentEpisode} />
        )}
      </div>
    </div>
  );
};

export default EpisodesContainer;
