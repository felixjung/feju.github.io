/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { ComponentDictionary } from '@mdx-js/react';
import {
  BlockQuote,
  CodeBlock,
  Heading,
  HorizontalRule,
  InlineCode,
  OrderedList,
  ProseText,
  spacing,
  UnorderedList,
  Text,
  Link,
  mq,
} from '@felixjung/plastuiq';

import { ImgIxImage } from '../ImgIxImage';

const CONTENT_WIDTH = '40rem';
const hPadding = 'small';

const H1: React.FC = ({ children }) => (
  <Heading
    as={'h1'}
    size="huge"
    css={css`
      width: 100%;
      max-width: ${CONTENT_WIDTH};
    `}
  >
    {children}
  </Heading>
);

const H2: React.FC = ({ children }) => (
  <Heading
    as={'h2'}
    size="regular"
    css={(theme) =>
      css`
        ${spacing({ bottom: 'large' })(theme)};
        ${spacing([null, hPadding], 'padding')(theme)};
        width: 100%;
        max-width: ${CONTENT_WIDTH};
      `
    }
  >
    {children}
  </Heading>
);

const H3: React.FC = ({ children }) => (
  <Heading
    as={'h3'}
    size="regular"
    css={(theme) =>
      css`
        ${spacing({ bottom: 'regular' })(theme)};
        ${spacing([null, hPadding], 'padding')(theme)};
        width: 100%;
        max-width: ${CONTENT_WIDTH};
      `
    }
  >
    {children}
  </Heading>
);

const H4: React.FC = ({ children }) => (
  <Heading
    as={'h4'}
    size="small"
    css={(theme) =>
      css`
        ${spacing({ bottom: 'regular' })(theme)};
        ${spacing([null, hPadding], 'padding')(theme)};
        width: 100%;
        max-width: ${CONTENT_WIDTH};
      `
    }
  >
    {children}
  </Heading>
);

const H5: React.FC = ({ children }) => (
  <Heading
    as={'h5'}
    size="small"
    css={(theme) =>
      css`
        ${spacing({ bottom: 'small' })(theme)};
        ${spacing([null, hPadding], 'padding')(theme)};
        width: 100%;
        max-width: ${CONTENT_WIDTH};
      `
    }
  >
    {children}
  </Heading>
);

const H6: React.FC = ({ children }) => (
  <Heading
    as={'h6'}
    size="small"
    css={(theme) =>
      css`
        ${spacing({ bottom: 'small' })(theme)};
        ${spacing([null, hPadding], 'padding')(theme)};
        width: 100%;
        max-width: ${CONTENT_WIDTH};
      `
    }
  >
    {children}
  </Heading>
);

const TEXT_SIZE = 'large';

interface ParagraphChildren extends React.ReactChildren {
  props: {
    key: string;
    mdxType: 'string';
  };
  type: string;
  key: string;
}

const Paragraph: React.FC<{
  children: ParagraphChildren;
}> = ({ children }) => {
  // FIXME: should be replaced in tooling
  if (children.props && children.props.mdxType === 'img') {
    return children;
  }

  return (
    <ProseText
      size={TEXT_SIZE}
      css={(theme) => css`
        :not(:last-of-type) {
          ${spacing({ bottom: 'large' })(theme)};
        }
        ${spacing([null, hPadding], 'padding')(theme)};
        width: 100%;
        max-width: ${CONTENT_WIDTH};
      `}
    >
      {children}
    </ProseText>
  );
};

const Emphasis: React.FC = ({ children }) => (
  <ProseText size={TEXT_SIZE} as="em">
    {children}
  </ProseText>
);
const Strong: React.FC = ({ children }) => (
  <ProseText size={TEXT_SIZE} as="strong">
    {children}
  </ProseText>
);

const Ul: React.FC = ({ children }) => (
  <UnorderedList
    css={(theme) =>
      css`
        width: 100%;
        max-width: ${CONTENT_WIDTH};
        ${spacing([null, hPadding], 'padding')(theme)};
        ${spacing({ bottom: 'large' })(theme)};
      `
    }
  >
    {children}
  </UnorderedList>
);
const Ol: React.FC = ({ children }) => (
  <OrderedList
    css={(theme) =>
      css`
        width: 100%;
        max-width: ${CONTENT_WIDTH};
        ${spacing([null, hPadding], 'padding')(theme)};
        ${spacing({ bottom: 'large' })(theme)};
      `
    }
  >
    {children}
  </OrderedList>
);

const StyledLi = ProseText.withComponent('li');
const Li: React.FC = ({ children, ...props }) => (
  <StyledLi {...props} size={TEXT_SIZE}>
    {children}
  </StyledLi>
);

type Language =
  | 'markup'
  | 'bash'
  | 'clike'
  | 'c'
  | 'cpp'
  | 'css'
  | 'javascript'
  | 'jsx'
  | 'coffeescript'
  | 'actionscript'
  | 'css-extr'
  | 'diff'
  | 'git'
  | 'go'
  | 'graphql'
  | 'handlebars'
  | 'json'
  | 'less'
  | 'makefile'
  | 'markdown'
  | 'objectivec'
  | 'ocaml'
  | 'python'
  | 'reason'
  | 'sass'
  | 'scss'
  | 'sql'
  | 'stylus'
  | 'tsx'
  | 'typescript'
  | 'wasm'
  | 'yaml';

function isLanguage(language: unknown): language is Language {
  if (typeof language !== 'string') {
    return false;
  }

  const langs = {
    'markup': true,
    'bash': true,
    'clike': true,
    'c': true,
    'cpp': true,
    'css': true,
    'js': true,
    'javascript': true,
    'jsx': true,
    'coffeescript': true,
    'actionscript': true,
    'css-extr': true,
    'diff': true,
    'git': true,
    'go': true,
    'graphql': true,
    'handlebars': true,
    'json': true,
    'less': true,
    'makefile': true,
    'markdown': true,
    'objectivec': true,
    'ocaml': true,
    'python': true,
    'reason': true,
    'sass': true,
    'scss': true,
    'sql': true,
    'stylus': true,
    'tsx': true,
    'ts': true,
    'typescript': true,
    'wasm': true,
    'yaml': true,
  };

  return langs[language];
}

const Code: React.FC<{ className: string; children: string }> = ({
  className = '',
  children,
}) => {
  const maybeLanguage = className.replace(/language-/, '');
  const language = isLanguage(maybeLanguage) ? maybeLanguage : 'markup';
  return (
    <div
      css={(theme) => css`
        ${spacing({ bottom: 'giant', top: 'large' })(theme)};
        background-color: #282a36;
        display: flex;
        justify-content: center;
        width: 100%;
      `}
    >
      <CodeBlock
        css={(theme) => css`
          width: 100%;
          max-width: 80ch;
          padding: 0;
          ${spacing(['huge', hPadding], 'padding')(theme)};
        `}
        language={language}
      >
        {children.trim()}
      </CodeBlock>
    </div>
  );
};

const Blockquote: React.FC = ({ children }) => (
  <BlockQuote
    css={(theme) => css`
      margin: ${spacing(['large', 'giant', 'giant'])(theme)};
      padding: ${theme.spacings.large};
      width: 100%;
      max-width: calc(${CONTENT_WIDTH} + ${theme.spacings.giant});

      li,
      p {
        max-width: ${CONTENT_WIDTH};
        font-family: ${theme.fonts.sans};

        :last-of-type {
          margin-bottom: 0;
        }
      }

      > * {
        margin-bottom: 0;
      }
    `}
  >
    {children}
  </BlockQuote>
);

const Hr: React.FC = () => (
  <HorizontalRule
    css={(theme) => css`
      margin: ${theme.spacings.giant} 0;
    `}
  />
);

const FigCaption: React.FC = ({ children }) => (
  <Text
    as="figcaption"
    size="small"
    transform="uppercase"
    css={(theme) =>
      css`
        text-align: center;
        font-family: ${theme.fonts.sans};
        margin-top: ${theme.spacings.regular};
        ${spacing([null, 'huge'], 'padding')(theme)};
      `
    }
  >
    {children}
  </Text>
);

const Img: React.FC<{ title: string; src: string; alt: string }> = ({
  title,
  ...props
}) => {
  const MAX_WIDTH = '1000px';
  const img = (
    <ImgIxImage
      {...props}
      css={(theme) => css`
        display: block;
        width: 100%;
        overflow: hidden;
        ${theme.shadows.high};

        ${!title && spacing(['large', null, 'giant', null])(theme)};

        ${mq('large')} {
          max-width: ${MAX_WIDTH};
          border-radius: ${theme.borderRadii.large};
        }
      `}
    />
  );

  if (!title) {
    return img;
  }

  return (
    <figure
      css={(theme) => css`
        width: 100%;
        max-width: ${MAX_WIDTH};
        display: block;
        ${spacing(['large', null, 'giant', null])(theme)};
      `}
    >
      {img}
      <FigCaption>{title}</FigCaption>
    </figure>
  );
};

const A: React.FC = (props) => (
  <Link
    {...props}
    css={(theme) => css`
      font-family: ${theme.fonts.sans};
      code {
        padding: 0;
        background-color: inherit;
      }
    `}
  />
);

const Wrapper: React.FC<{ children: React.ReactElement }> = ({ children }) =>
  children;

const Pre: React.FC<{ children: React.ReactElement }> = ({ children }) =>
  children;

export const components: ComponentDictionary = {
  code: Code,
  pre: Pre,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  em: Emphasis,
  strong: Strong,
  inlineCode: InlineCode,
  ol: Ol,
  ul: Ul,
  li: Li,
  a: A,
  wrapper: Wrapper,
  blockquote: Blockquote,
  hr: Hr,
  img: Img,
};
