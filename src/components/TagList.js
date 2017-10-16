import styled from 'react-emotion'

const TagList = styled('ul')(({ theme }) => ({
  display: 'block',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  li: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    '&:not(:last-of-type)': {
      marginRight: theme.spacing.xs
    }
  }
}))

export default TagList
