import React, { FunctionComponent } from 'react';

export interface EmojiProps {
  alt: string;
  emoji: string;
}

export const Emoji: FunctionComponent<EmojiProps> = ({ alt, emoji }) => (
  <span role="img" aria-label={alt}>
    {emoji}
  </span>
);
