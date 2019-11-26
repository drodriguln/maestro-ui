import React from 'react';
import { setPlayerData } from '../../store/player/actions';
import { fetchArtists, fetchAlbums, fetchSongs, setArtist, setAlbum, setSong } from '../../store/library/actions';
import isEmpty from 'is-empty';
import {makeStyles, Theme} from "@material-ui/core/styles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {Album, Artist, Song, Store} from "../../store/types";
import {useDispatch, useSelector} from "react-redux";

enum Panel {
  ARTIST,
  ALBUM,
  SONG,
  NONE
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  },
  panelList: {
    overflowY: 'auto',
    maxHeight: '150px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
}));

const LoadingIndicator = () => (
  <Grid container justify="center">
    <CircularProgress />
  </Grid>
);

const Library = () => {
  const [selectedPanel, setSelectedPanel] = React.useState(Panel.NONE);
  const { artists, artist, albums, album, songs, song } = useSelector((state: Store) => state.library);
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    if (fetchArtists !== undefined) {
      dispatch(fetchArtists());
    }
  }, []);

  const selectPanel = (panel: Panel) => {
    setSelectedPanel(selectedPanel !== panel ? panel : Panel.NONE);
  };
  const selectArtist = (selectedArtist: Artist) => {
    setSelectedPanel(Panel.NONE);
    dispatch(setArtist(selectedArtist));
    dispatch(fetchAlbums(selectedArtist.id));
  };
  const selectAlbum = (selectedAlbum: Album) => {
    setSelectedPanel(Panel.NONE);
    dispatch(setAlbum(selectedAlbum));
    dispatch(fetchSongs(artist.id, selectedAlbum.id));
  };
  const selectSong = (selectedSong: Song) => {
    setSelectedPanel(Panel.NONE);
    dispatch(setSong(selectedSong));
    dispatch(setPlayerData(artist, album, selectedSong, songs));
  };
  const createArtistList = () => (
    isEmpty(artists) ?
      <LoadingIndicator /> :
      <List>
        { artists.map((selectedArtist: Artist) => (
          <ListItem key={selectedArtist.id} button onClick={() => selectArtist(selectedArtist)}>
            <ListItemText secondary={selectedArtist.name} />
          </ListItem>
        ))}
      </List>
  );
  const createAlbumList = () => (
    isEmpty(albums) ?
      <LoadingIndicator /> :
      <List>
        { albums.map((selectedAlbum: Album) => (
          <ListItem key={selectedAlbum.id} button onClick={() => selectAlbum(selectedAlbum)}>
            <ListItemText secondary={selectedAlbum.name} />
          </ListItem>
        ))}
      </List>
  );
  const createSongList = () => (
    isEmpty(songs) ?
      <LoadingIndicator /> :
      <List>
        { songs.map((selectedSong: Song) => (
          <ListItem key={selectedSong.id} button onClick={() => selectSong(selectedSong)}>
            <ListItemText secondary={selectedSong.name} />
          </ListItem>
        ))}
      </List>
  );

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={selectedPanel === Panel.ARTIST}
        onChange={() => selectPanel(Panel.ARTIST)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Artist
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {artist.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelList}>
          {createArtistList()}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={selectedPanel === Panel.ALBUM}
        onChange={() => selectPanel(Panel.ALBUM)}
        disabled={isEmpty(artist)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Album
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {album.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelList}>
          {createAlbumList()}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={selectedPanel === Panel.SONG}
        onChange={() => selectPanel(Panel.SONG)}
        disabled={isEmpty(artist) || isEmpty(album)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Song
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {song.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelList}>
          {createSongList()}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default Library;
