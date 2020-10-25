import React from 'react';

import { create, renderToHtml, axe, RenderFn } from '../../util/test-utils';

import { BlogPost, BlogPostProps } from './BlogPost';

describe('BlogPost', () => {
  function renderBlogPost(renderFn: RenderFn, props: BlogPostProps = {}) {
    return renderFn(<BlogPost {...props} />);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderBlogPost(create);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it.todo('should have tests');
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderBlogPost(renderToHtml);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
