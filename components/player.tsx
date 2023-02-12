import { FC, useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Center,
  Box,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';

import { formatTime } from '../lib/formatter';

interface Song {
  id: string;
  name: string;
  createdAt: Date;
  duration: number;
  url: string;
}

interface PlayerProps {
  songs: Array<Song>;
  activeSong: Song;
}

const Player: FC<PlayerProps> = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );

  useEffect(() => setPlaying(true), []);

  useEffect(() => setPlaying(true), [activeSong]);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);

      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => (state ? state - 1 : songs.length - 1));
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      soundRef.current.seek(0);
      setSeek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center>
        <ButtonGroup
          sx={{
            '& > *:hover, & > *:focus': {
              color: 'whiteAlpha.900',
            },
          }}
        >
          <Tooltip
            placement="top"
            label="Shuffle"
            aria-label="Shuffle"
            hasArrow
          >
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              fontSize="24px"
              icon={<MdShuffle />}
              color={shuffle ? 'white' : 'gray.600'}
              onClick={onShuffle}
            />
          </Tooltip>

          <Tooltip
            placement="top"
            label="Prev Song"
            aria-label="Previous Song"
            hasArrow
          >
            <IconButton
              outline="none"
              variant="link"
              aria-label="prev skip"
              fontSize="24px"
              icon={<MdSkipPrevious />}
              onClick={prevSong}
            />
          </Tooltip>
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <Tooltip
            placement="top"
            label="Next Song"
            aria-label="Next Song"
            hasArrow
          >
            <IconButton
              outline="none"
              variant="link"
              aria-label="next song"
              fontSize="24px"
              icon={<MdSkipNext />}
              onClick={nextSong}
            />
          </Tooltip>
          <Tooltip
            placement="top"
            label="Repeat Song"
            aria-label="Repeat Song"
            hasArrow
          >
            <IconButton
              outline="none"
              variant="link"
              aria-label="repeat song"
              fontSize="24px"
              icon={<MdOutlineRepeat />}
              color={repeat ? 'white' : 'gray.600'}
              onClick={onRepeat}
            />
          </Tooltip>
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box w="10%">
            <Text fontSize="x-small" color="white">
              {formatTime(seek)}
            </Text>
          </Box>
          <Box w="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box w="10%">
            <Text fontSize="xs" textAlign="right" color="white">
              {formatTime(duration)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
