declare module "react-player/lib/players/YouTube" {
  import React from "react";
  import { ReactPlayerProps } from "react-player";
  export default class YouTube extends React.Component<ReactPlayerProps, any> {}
}

declare module "react-player/lib/players/SoundCloud" {
  import React from "react";
  import { ReactPlayerProps } from "react-player";
  export default class SoundCloud extends React.Component<
    ReactPlayerProps,
    any
  > {}
}
