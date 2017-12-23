import React from 'react'
import styled from 'react-emotion'

import GithubSvg from '../assets/icons/github.svg'
import InstagramSvg from '../assets/icons/instagram.svg'
import TwitterSvg from '../assets/icons/twitter.svg'

const iconSizes = ({ theme }) => ({
  width: theme.spacing.xxxxl,
  height: theme.spacing.xxxxl
})

export const Github = styled(GithubSvg)(
  ({ theme }) => ({
    fill: theme.colors.githubIcon
  }),
  iconSizes
)

export const Instagram = styled(InstagramSvg)(
  ({ theme }) => ({
    fill: theme.colors.instagramIcon
  }),
  iconSizes
)

export const Twitter = styled(TwitterSvg)(
  ({ theme }) => ({
    fill: theme.colors.twitterIcon
  }),
  iconSizes
)
