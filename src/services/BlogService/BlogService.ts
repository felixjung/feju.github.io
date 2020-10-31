import { promises as fsPromises } from 'fs';
import { resolve } from 'path';

import chunk from 'lodash/fp/chunk';

const { readFile } = fsPromises;

// TODO: move to config
const postsJSONPath = resolve('src/posts.json');

// TODO: move to config
const PAGE_SIZE = 20;

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  publishDate?: string;
  isPublished: boolean;
  body: string;
};

export async function getPosts(onlyPublished = true): Promise<BlogPost[]> {
  const postsJSON = await readPosts(postsJSONPath);
  const posts = parsePostsJSON(postsJSON);

  return posts
    .filter(
      ({ isPublished }) => !onlyPublished || (onlyPublished && isPublished),
    )
    .sort(publishDateCompareFn)
    .map(({ publishDate, ...post }) => {
      if (publishDate === undefined) {
        return post;
      }

      const formattedDate = formatDate(publishDate);
      return {
        ...post,
        publishDate: formattedDate,
      };
    });
}

export async function getPost(
  slug: string,
  onlyPublished = true,
): Promise<BlogPost | undefined> {
  const posts = await getPosts(onlyPublished);
  return getPostBySlug(slug, posts);
}

export async function getPageRoutes(onlyPublished = true) {
  const posts = await getPosts(onlyPublished);
  const pageCount = Math.ceil(posts.length / PAGE_SIZE);

  return Array(pageCount)
    .fill(0)
    .map((_, i) => i + 1);
}

type PostSummary = {
  title: string;
  category: string;
  slug: string;
  summary: string;
  tags: string[];
  publishDate?: string;
};

export async function getPageData(
  page: string,
  onlyPublished = true,
): Promise<{
  posts: PostSummary[];
  page: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}> {
  const pageNumber = Number(page);
  const allPosts = await getPosts(onlyPublished);
  const pages = chunk(PAGE_SIZE, allPosts);
  const pageIndex = pageNumber - 1;
  if (pageIndex < 0 || pageIndex >= pages.length) {
    throw new Error('page does not exist');
  }

  return {
    totalPages: pages.length,
    page: pageNumber,
    posts: pages[pageIndex].map(
      ({ summary, body, isPublished, category, ...post }) => ({
        summary,
        category: formatCategory(category),
        ...post,
      }),
    ),
    hasPrevious: pageIndex > 0,
    hasNext: pageIndex < pages.length - 1,
  };
}

export function formatDate(date: string): string {
  const d = new Date(date);
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const intl = new Intl.DateTimeFormat('en-US', options);

  return intl.format(d);
}

export function formatCategory(category: string): string {
  return category
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ');
}

export function getPostURL(slug: string): string {
  return `/blog/posts/${slug}`;
}

function getPostBySlug(slug: string, posts: BlogPost[]): BlogPost | undefined {
  return posts.find(({ slug: postSlug }) => postSlug === slug);
}

async function readPosts(path: string): Promise<string> {
  const postsJSON = await readFile(path, { encoding: 'utf-8' });
  return postsJSON;
}

function parsePostsJSON(postsJSON: string): BlogPost[] {
  const postObjects = JSON.parse(postsJSON);

  if (!Array.isArray(postObjects)) {
    throw new Error('failed to parse posts as array');
  }

  return postObjects.map(parsePostJSONObject).sort();
}

function parsePostJSONObject(postObject: unknown): BlogPost {
  // TODO: implement checks
  const post = postObject as BlogPost;
  return post;
}

function isUndefined(value: unknown): value is undefined {
  if (typeof value === 'undefined') {
    return true;
  }

  return false;
}

function publishDateCompareFn(
  { publishDate: publishDateA }: BlogPost,
  { publishDate: publishDateB }: BlogPost,
): number {
  if (isUndefined(publishDateA) && !isUndefined(publishDateB)) {
    return 1;
  }

  if (!isUndefined(publishDateA) && isUndefined(publishDateB)) {
    return -1;
  }

  if (isUndefined(publishDateA) && isUndefined(publishDateB)) {
    return 0;
  }

  // This should never happen, but the compiler does not agree.
  if (isUndefined(publishDateA) || isUndefined(publishDateB)) {
    return 0;
  }

  const dateA = new Date(publishDateA);
  const dateB = new Date(publishDateB);

  // Somehow type guard for undefined is not working
  if (dateA && dateB && dateA < dateB) {
    return 1;
  }

  if (dateA && dateB && dateA > dateB) {
    return -1;
  }

  return 0;
}
