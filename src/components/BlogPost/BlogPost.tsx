/** @jsxImportSource @emotion/core */

import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import { TagList, HorizontalRule, spacing, Text } from '@felixjung/plastuiq';

import { MDX } from '../MDX';

import { components } from './components';

export const config = {
  unstable_runtimeJS: false,
};

export type BlogPostProps = {
  title: string;
  category: string;
  tags: string[];
  publishDate?: string;
  body: string;
  summary: string;
};

export const BlogPost = ({
  body,
  title,
  publishDate,
  category,
  tags,
  summary,
}: BlogPostProps) => (
  <main>
    <MDXProvider components={components}>
      <article
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <header
          css={(theme) => css`
            ${spacing(
              { right: 'small', bottom: 'giant', left: 'small' },
              'padding',
            )(theme)};

            width: 100%;
            max-width: 40rem;
          `}
        >
          <Text size="large" css={spacing({ bottom: 'regular' })}>
            On {publishDate} in{' '}
            <Text as="span" size="large" weight="heavy">
              {category}
            </Text>
          </Text>
          <MDX code={title} />
          <Text size="huge" css={spacing({ bottom: 'huge', top: 'huge' })}>
            {summary}
          </Text>
          <TagList tags={tags} />
        </header>
        <HorizontalRule css={spacing({ bottom: 'giant' })} />
        <MDX code={body} />
      </article>
    </MDXProvider>
  </main>
);
