/** @jsx jsx */

import * as React from 'react';
import { jsx, css } from '@emotion/core';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import { getPageData, getPageRoutes } from 'services/BlogService';
import {
  Heading,
  HorizontalRule,
  TagList,
  Text,
  spacing,
  mq,
  Theme,
} from '@felixjung/plastuiq';

import * as MetaService from '../../../services/MetaService';
import { MetaTags } from '../../../components/MetaTags';
import { PageProps } from '../../../types/page';

type PostSummary = {
  title: string;
  category: string;
  summary: string;
  slug: string;
  publishDate?: string;
  tags: string[];
};

interface PostsPageProps extends PageProps {
  posts: PostSummary[];
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
  page: number;
}

type PostsPageParams = {
  page: string;
};

export const getStaticProps: GetStaticProps<
  PostsPageProps,
  PostsPageParams
> = async ({ params }) => {
  const pageData = await getPageData(params?.page || '');
  const title = MetaService.getPageTitle();
  const path = `/blog/pages/${params?.page}`;
  const url = MetaService.getPageURL(path);
  return { props: { ...pageData, title, url } };
};

export const getStaticPaths: GetStaticPaths<PostsPageParams> = async () => {
  const pageRoutes = await getPageRoutes(true);
  const paths = pageRoutes.map((page) => ({ params: { page: `${page}` } }));

  return { paths, fallback: false };
};

const PostList: React.FC<{ posts: PostSummary[] }> = ({ posts }) => (
  <main
    css={(theme) => css`
      margin: 0 auto;
      padding: 0 ${theme.spacings.small};
      max-width: 40rem;
    `}
  >
    {posts.map(({ title, category, summary, publishDate, tags, slug }) => (
      <React.Fragment key={title}>
        <article
          css={(theme) => css`
            :not(:last-of-type) {
              margin-bottom: ${theme.spacings.giant};
            }
          `}
        >
          <Text size="regular" css={spacing({ bottom: 'small' })}>
            {publishDate} in{' '}
            <Text as="span" size="regular" weight="heavy">
              {category}
            </Text>
          </Text>
          <NextLink href={`/blog/posts/${slug}`} passHref>
            <a
              css={(theme: Theme) => css`
                color: ${theme.colors.n900};
                text-decoration: none;
              `}
              href={`/blog/posts/${slug}`}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Heading
                as="h2"
                size="regular"
                css={(theme) => css`
                  line-height: 1.2em;
                  ${spacing({ bottom: 'regular' })(theme)}
                  &:hover {
                    cursor: pointer;
                  }
                `}
              >
                {title}
              </Heading>
            </a>
          </NextLink>
          <Text size="huge" css={spacing({ bottom: 'large' })}>
            {summary}
          </Text>
          <TagList tags={tags} />
        </article>
        <HorizontalRule
          css={(theme) =>
            css`
              ${mq('large')} {
                display: none;
              }

              ${spacing({ bottom: 'giant' })(theme)}
            `
          }
        />
      </React.Fragment>
    ))}
  </main>
);

const PostsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  title,
  url,
}) => (
  <React.Fragment>
    <MetaTags
      title={title}
      description="A software development blog by Felix Jung."
      url={url}
    />
    <PostList posts={posts} />
  </React.Fragment>
);

export default PostsPage;
