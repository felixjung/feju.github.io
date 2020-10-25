import React from 'react';

import { create, renderToHtml, axe, RenderFn } from '../../util/test-utils';

import { MDX, MDXProps } from './MDX';

describe('MDX', () => {
  function renderMDX(renderFn: RenderFn, props: MDXProps = {}) {
    return renderFn(<MDX {...props} />);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderMDX(create);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it.todo('should have tests');
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderMDX(renderToHtml);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
