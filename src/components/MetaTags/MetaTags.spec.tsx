import { create, renderToHtml, axe, RenderFn } from '../../util/test-utils';

import { MetaTags, MetaTagsProps } from './MetaTags';

describe('MetaTags', () => {
  function renderMetaTags(renderFn: RenderFn, props: MetaTagsProps = {}) {
    return renderFn(<MetaTags {...props} />);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderMetaTags(create);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it.todo('should have tests');
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderMetaTags(renderToHtml);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
