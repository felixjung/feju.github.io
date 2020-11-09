/** @jsxImportSource @emotion/core */

import { Fragment, FunctionComponent, ImgHTMLAttributes } from 'react';
import { css } from '@emotion/core';

type Config = {
  width: number;
  media?: string;
};

export interface ImgIxImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  configs?: Config[];
}

function createSource(src: string, width: number, ext = ''): string {
  const format = ext ? `&fm=${ext}` : '';
  return Array.from(
    Array(3),
    (_, i) =>
      `${src}?q=${70 - i * 20}&w=${width}&dpr=${i + 1}&fix=max${format} ${
        i + 1
      }x`,
  ).join(',');
}
/**
 * Describe ImgIxImage here.
 */
export const ImgIxImage: FunctionComponent<ImgIxImageProps> = ({
  src,
  alt,
  configs = [
    {
      width: 450,
    },
    {
      width: 1024,
      media: '(min-width: 768px)',
    },
    {
      width: 1440,
      media: '(min-width: 1280px)',
    },
    {
      width: 2560,
      media: '(min-width: 1920px)',
    },
  ],
  ...props
}: ImgIxImageProps) => {
  const [base, ...responsiveConfigs] = configs;
  // width, media query
  return (
    <picture {...props}>
      {responsiveConfigs.map(({ width, media }) => (
        <Fragment key={width}>
          <source
            key={`${width}-def`}
            srcSet={createSource(src, width)}
            media={media}
          />
          <source
            key={`${width}-webp`}
            srcSet={createSource(src, width, 'webp')}
            type={`image/webp`}
            media={media}
          />
        </Fragment>
      ))}
      <source
        srcSet={createSource(src, base.width, 'webp')}
        type={`image/webp`}
      />
      <img
        css={css`
          display: block;
          width: 100%;
        `}
        srcSet={createSource(src, base.width)}
        alt={alt}
      />
    </picture>
  );
};
