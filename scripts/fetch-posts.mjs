import { promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

import pkg from '@octokit/graphql';
import yamlParser from 'yaml';

const { graphql } = pkg;
const { writeFile } = fsPromises;

async function fetchFiles(owner, repo, path) {
  const query = `
    query contents($owner: String!, $repo: String!, $path: String!) {
      repository(owner: $owner, name: $repo) {
        ... on Repository {
          items: object(expression: $path) {
            ... on Tree {
              entries {
                name
                type
                object {
                  ... on Tree {
                    entries {
                      name
                      object {
                        ... on Blob {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const resp = await graphql(query, {
    owner,
    repo,
    path,
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!resp.repository.items) {
    console.error(resp.repository.items);
    throw new Error('failed to fetch files');
  }

  return resp.repository.items.entries.filter(({ type }) => type === 'tree');
}

function composePostData({ name: slug, ...entry }) {
  const subTree = entry.object.entries;

  const bodyMDX = getPostBody(subTree);
  const metaYAML = getPostMeta(subTree);

  if (!bodyMDX || !metaYAML) {
    return null
  }

  const { summary, ...metadata } = getMetadata(metaYAML);
  const { body, title } = splitPost(bodyMDX);

  return {
    slug,
    title,
    summary: summary.trim(),
    ...metadata,
    isPublished: isPublished(metadata.publishDate),
    body: rewriteImageURLs(body),
  };
}

function getPostBody(entries) {
  const postEntry = getEntryByName('index.md', entries);
  if (!postEntry) {
    return null
  }

  return getEntryText(postEntry);
}

function getEntryByName(name, entries) {
  return entries.find(({ name: n }) => n === name);
}

function getEntryText(entry) {
  return entry.object.text;
}

function getPostMeta(entries) {
  const postMeta = getEntryByName('metadata.yaml', entries);
  if (!postMeta) {
    return null
  }

  return getEntryText(postMeta);
}

function getMetadata(yaml) {
  const parsedYAML = yamlParser.parse(yaml);
  return parsedYAML;
}

function getTitle(regex, text) {
  const res = regex.exec(text);
  if (res === null) {
    return '';
  }

  return res[1];
}

function splitPost(mdx) {
  const titleRegex = /^# ?(.+)\n$/im;

  const title = getTitle(titleRegex, mdx);

  if (title.length === 0) {
    throw new Error('no title found');
  }

  const body = mdx.replace(titleRegex, '').trim();

  return { title, body };
}

function isPublished(publishDate) {
  if (!publishDate) {
    return false;
  }

  return new Date(publishDate) <= new Date();
}

function rewriteImageURLs(mdx) {
  const imgRegex = /\]\(images\//gi;
  return mdx.replace(imgRegex, '](https://felixjung.imgix.net/');
}

async function main() {
  const path = 'HEAD:posts';
  const repo = 'blog-posts';
  const owner = 'felixjung';
  const dest = join(resolve(), 'src/posts.json');

  const fileEntries = await fetchFiles(owner, repo, path);
  const posts = fileEntries.map(composePostData).filter(p => !!p);
  await writeFile(dest, JSON.stringify(posts, null, 2));
}

try {
  main();
} catch (e) {
  console.log(e);
  process.exit(1);
}
