// Copied from: https://github.com/justinmc/react-audio-player/issues/60
declare module 'react-audio-player' {
  import { Component, HTMLProps, Ref, SyntheticEvent } from 'react';

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  export interface ReactAudioPlayerProps extends Omit<HTMLProps<HTMLAudioElement>, "ref"> {
    autoPlay?: boolean;
    children?: Element[];
    className?: string;
    controls?: boolean;
    crossOrigin?: string;
    controlsList?: string;
    id?: string;
    loop?: boolean;
    muted?: boolean;
    volume?: number;
    preload?: '' | 'none' | 'metadata' | 'auto';
    src?: string;
    style?: {};

    ref?: Ref<ReactAudioPlayer>;

    listenInterval?: number;
    onListen?: (currentTime: number) => void;
    // HTMLProps has onVolumeChange (not past tense). This covers the
    // alternate spelling used by this component.
    onVolumeChanged?: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
  }

  export default class ReactAudioPlayer extends Component<ReactAudioPlayerProps, any> {
    readonly audioEl: HTMLAudioElement;
  }
}