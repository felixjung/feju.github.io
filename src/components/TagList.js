import styled from 'react-emotion'

const TagList = styled('ul')(({ theme }) => ({
  display: 'block',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  li: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginBottom: `calc(${theme.spacing.xxs} / 2)`,
    '&:not(:last-of-type)': {
      marginRight: `calc(${theme.spacing.xxs} / 2)`
    }
  }
}))

export default TagList
