import { config } from '../../config';

// TODO: move to config
const PAGE_SIZE = 20;

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  publishDate?: string;
  body: string;
};

function isBlogPost(something: unknown): something is BlogPost {
  if (typeof something !== 'object') {
    return false;
  }

  const maybeBlogPost = something as BlogPost;

  if (maybeBlogPost === null || typeof maybeBlogPost !== 'object') {
    return false;
  }

  const hasSummary = typeof maybeBlogPost.summary === 'string';
  const hasCategory = typeof maybeBlogPost.category === 'string';
  const maybeTags = maybeBlogPost.tags;
  const hasTags =
    Array.isArray(maybeTags) &&
    maybeTags.reduce(
      (allStrings, value) => allStrings && typeof value === 'string',
      true,
    );
  const hasPublishDate = ['undefined', 'string'].includes(
    typeof maybeBlogPost.publishDate,
  );
  const hasBody =
    typeof maybeBlogPost.body === 'string' && maybeBlogPost.body.length > 0;

  const hasTitle =
    typeof maybeBlogPost.title === 'string' && maybeBlogPost.title.length > 0;

  return (
    hasSummary &&
    hasCategory &&
    hasTags &&
    hasPublishDate &&
    hasBody &&
    hasTitle
  );
}

export async function getPosts(
  offset: number,
  limit: number,
): Promise<BlogPost[]> {
  const url = `${config.cmsBaseURL}/posts?offset=${offset}&limit=${limit}`;
  const resp = await fetch(url);
  const respJSON = await resp.json();

  const maybePosts: unknown = respJSON?.data;

  if (typeof maybePosts === 'undefined' || !Array.isArray(maybePosts)) {
    throw new Error('failed to fetch posts');
  }

  return maybePosts.filter(isBlogPost);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const url = `${config.cmsBaseURL}/posts/${slug}`;
  const post = await fetch(url);
  const postJSON = await post.json();

  if (typeof postJSON?.data === 'undefined') {
    throw new Error('failed to fetch post');
  }

  return parsePostJSONObject(postJSON?.data);
}

export async function getPageRoutes() {
  const posts = await getPosts(0, 1000);
  const pageCount = Math.ceil(posts.length / PAGE_SIZE);

  return Array(pageCount)
    .fill(0)
    .map((_, i) => i + 1);
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

function parsePostJSONObject(postObject: unknown): BlogPost {
  // TODO: implement checks
  const post = postObject as BlogPost;
  return post;
}
