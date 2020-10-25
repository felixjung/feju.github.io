import * as React from 'react';
import Head from 'next/head';

type MetaProps = {
  title?: string;
  description?: string;
  twitter?: string;
  updateTime?: string;
  previewImage?: {
    url: string;
    alt: string;
  };
  url: string;
  type?: string;
  author?: string;
};

export const MetaTags: React.FunctionComponent<MetaProps> = ({
  title = 'felixjung.io',
  description = 'Personal Website of Felix Jung',
  url,
  previewImage,
  author = 'Felix Jung',
  twitter,
  updateTime,
  type = 'website',
}) => {
  const maskBackground = '#5bbad5';
  const themeColor = '#ffffff';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      {twitter && <meta name="twitter:site" content={twitter} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {previewImage && (
        <React.Fragment>
          <meta name="twitter:image" content={previewImage.url} />

          <meta name="twitter:image:alt" content={previewImage.alt} />
        </React.Fragment>
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {author && <meta property="og:article:author" content={author} />}
      {updateTime && <meta property="og:updated_time" content={updateTime} />}
      {url && <meta property="og:url" content={url} />}
      {previewImage && (
        <React.Fragment>
          <meta property="og:image:secure_url" content={previewImage.url} />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image:width" content="240" />
          <meta property="og:image:height" content="240" />
        </React.Fragment>
      )}

      {/* PWA */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={'/meta/apple-touch-icon.png'}
      />
      <link
        rel="icon"
        type="image/png"
        href={'/meta/favicon-32x32.png'}
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href={'/meta/favicon-16x16.png'}
        sizes="16x16"
      />
      {/* TODO: add working manifest.json  */}
      {/* <link rel="manifest" href={'/meta/manifest.json'} /> */}
      <link
        rel="mask-icon"
        href={'/meta/safari-pinned-tab.svg'}
        color={maskBackground}
      />
      <meta name="theme-color" content={themeColor} />
    </Head>
  );
};
