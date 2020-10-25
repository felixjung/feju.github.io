/** @jsx jsx */

import { Fragment, FunctionComponent } from 'react';
import { jsx, css } from '@emotion/core';
import { ProfileImage } from 'components/ProfileImage';
import { Svg } from 'react-optimized-image';
import { Theme, Link, Text, spacing, UnorderedList } from '@felixjung/plastuiq';
import { size } from 'polished';
import { GetStaticProps } from 'next';

import styled from '../../styled';
import GithubSvg from '../../images/icons/github.svg';
import InstagramSvg from '../../images/icons/instagram.svg';
import TwitterSvg from '../../images/icons/twitter.svg';
import { Emoji } from '../../components/Emoji';
import { MetaTags } from '../../components/MetaTags';
import * as MetaService from '../../services/MetaService';

export const config = {
  unstable_runtimeJS: false,
};

type IconProps = {
  role: string;
};

const Github: FunctionComponent<IconProps> = (props) => (
  <Svg {...props} src={GithubSvg} />
);
const Instagram: FunctionComponent<IconProps> = (props) => (
  <Svg {...props} src={InstagramSvg} />
);
const Twitter: FunctionComponent<IconProps> = (props) => (
  <Svg {...props} src={TwitterSvg} />
);

type IconConfig = {
  component: FunctionComponent<IconProps>;
  name: string;
  url: string;
  fillColor: string;
  label: string;
} & Partial<IconProps>;

const iconConfigs: IconConfig[] = [
  {
    component: Github,
    name: 'github',
    url: 'https://github.com/felixjung',
    label: 'Check out my code on Github.',
    fillColor: '#3f3f3f',
  },
  {
    component: Twitter,
    name: 'twitter',
    url: 'https://twitter.com/feju',
    label: 'Follow @feju on Twitter.',
    fillColor: '#20A4F3',
  },
  {
    component: Instagram,
    name: 'instagram',
    url: 'https://instagram.com/felixjung',
    label: 'I post some photos on Instagram, too.',
    fillColor: '#FF8484',
  },
];

const SocialIcons = styled('ul')`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const SocialIcon = styled('li')(({ theme }) => ({
  '&:not(:last-of-type)': {
    marginRight: theme.spacings.huge,
  },
}));

const paragraphStyles = (theme: Theme) => css`
  margin-bottom: ${theme.spacings.regular};
  max-width: 40rem;
  width: 100%;

  &:not(:last-of-type) {
    ${spacing({ bottom: 'large' })(theme)};
  }
`;

type AboutProps = {
  url: string;
  title: string;
};

const About: FunctionComponent<AboutProps> = ({ url, title }) => (
  <Fragment>
    <MetaTags
      url={url}
      title={title}
      description="Felix is a Berlin-based software engineer experienced working in front- and backends with JavaScript, TypeScript, and Go."
    />
    <main
      css={(theme) => css`
        align-items: center;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        display: flex;
        padding: 0 ${theme.spacings.small};
      `}
    >
      <ProfileImage
        height="16rem"
        width="16rem"
        css={(theme: Theme) => css`
          ${size(theme.spacings.titanic)};
          border-radius: 100%;
          ${spacing(['giant', null])(theme)};

          ${theme.shadows.low};
        `}
      />
      <section css={spacing({ bottom: 'giant' })}>
        <Text size="large" css={paragraphStyles}>
          Hi, I am Felix. I have the privilege of writing code for a living,
          since 2015 as a Software Engineer at{' '}
          <Link href="https://sumup.com" target="_blank" rel="noreferrer">
            SumUp
          </Link>
          . My work there has included
        </Text>
        <UnorderedList
          size="large"
          css={(theme) => css`
            ${spacing(['large', null])(theme)};
            max-width: 40rem;
            width: 100%;
          `}
        >
          <li>product feature delivery in single page web applications,</li>
          <li>
            significant contributions to the company&apos;s open source React
            component library,{' '}
            <Link
              href="https://github.com/sumup-oss/circuit-ui"
              target="_blank"
              rel="noreferrer"
            >
              Circuit UI
            </Link>
            ,
          </li>
          <li>
            the creation of the{' '}
            <Link
              href="https://github.com/sumup-oss/foundry"
              target="_blank"
              rel="noreferrer"
            >
              Foundry JavaScript toolkit
            </Link>{' '}
            to increase maintainability of project tooling and developer
            productivity,
          </li>
          <li>
            the launch of SumUp&apos;s{' '}
            <Link
              href="https://opensource.sumup.com"
              target="_blank"
              rel="noreferrer"
            >
              open source organization
            </Link>
            , including an automated{' '}
            <Link
              href="https://www.apache.org/licenses/contributor-agreements.html"
              target="_blank"
              rel="noreferrer"
            >
              CLA
            </Link>{' '}
            process, and
          </li>
          <li>
            large contributions to the design and implementation of the
            Logistics Platform, a modular backend application to handle shipping
            and other logistics processes for the company across all markets,
            written in Go.
          </li>
        </UnorderedList>
        <Text size="large" css={paragraphStyles}>
          Check out my GitHub profile, Twitter account, or Instagram feed below
          to see what else I am up to.
        </Text>
        <Text size="large" css={paragraphStyles}>
          If you would like to get in touch, send me a tweet or a good old{' '}
          <Link href="mailto:jung.felix@gmail.com">
            <Emoji alt="Envelope Emoji" emoji="📨" />
          </Link>
          .
        </Text>
      </section>
      <SocialIcons>
        {iconConfigs.map(
          ({ component: Icon, name, url: socialURL, label, fillColor }) => (
            <SocialIcon key={name}>
              <a href={socialURL} target="_blank" rel="noreferrer">
                <Icon
                  role="img"
                  aria-label={label}
                  css={(theme: Theme) => css`
                    ${size(theme.spacings.giant)};
                    fill: ${fillColor};
                  `}
                />
              </a>
            </SocialIcon>
          ),
        )}
      </SocialIcons>
    </main>
  </Fragment>
);

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const title = MetaService.getPageTitle('About', 'felixjung.io');
  const url = MetaService.getPageURL('/about');

  return Promise.resolve({
    props: {
      title,
      url,
    },
  });
};

export default About;
