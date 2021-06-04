import { List, ListItem, ListItemText } from "@material-ui/core";
import { EpisodeResponseItem } from "models/episode";
import React from "react";

export interface EpisodeListProps {
  episodes: EpisodeResponseItem[];
  selectEpisode: (episodeId: string) => void;
  currentEpisode: EpisodeResponseItem | null;
}

const EpisodeList = ({ episodes, selectEpisode, currentEpisode }: EpisodeListProps) => {
  return (
    <>
      {episodes?.length > 0 ? (
        <List component="nav" data-test="episodes-list">
          {episodes.map((episode: EpisodeResponseItem) => (
            <ListItem
              key={episode.id}
              button
              onClick={() => selectEpisode(episode.id)}
              selected={episode.id === currentEpisode?.id}
            >
              <ListItemText primary={episode.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div>nada</div>
      )}
    </>
  );
};

export default EpisodeList;
