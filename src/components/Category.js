import styled from 'react-emotion'

import Tag from './Tag'

const Category = styled(Tag)(({ theme }) => ({
  borderRadius: theme.radius.m,
  backgroundColor: theme.colors.greyHeavy
}))

export default Category
