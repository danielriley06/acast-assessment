import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "react-h5-audio-player/lib/styles.css";
import { EpisodeResponseItem } from "models/episode";
import AudioPlayer from "react-h5-audio-player";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "60%",
      width: "80%",
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "80%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "33%",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: "80%",
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

export interface EpisodePlayerProps {
  episodeData: EpisodeResponseItem | null;
}

const EpisodePlayer = ({ episodeData }: EpisodePlayerProps) => {
  const classes = useStyles();
  const [count, setCount] = useState("0");
  const milliToSeconds = (ms: number) => (ms / 1000).toFixed(1);
  const handleMarkerUpdates = (event: Event) => {
    const convervtedTimestamp = milliToSeconds(event.timeStamp);
    setCount(convervtedTimestamp);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {episodeData?.name}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <AudioPlayer
            autoPlayAfterSrcChange={false}
            src={`http://localhost:1337${episodeData?.audio}`}
            onListen={handleMarkerUpdates}
          />
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="http://localhost:1337/images/image01.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
};

export default EpisodePlayer;
