import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  /* eslint-disable class-methods-use-this */
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default Document;
