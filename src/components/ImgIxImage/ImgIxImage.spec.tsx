import { create, renderToHtml, axe, RenderFn } from '../../util/test-utils';

import { ImgIxImage, ImgIxImageProps } from './ImgIxImage';

describe('ImgIxImage', () => {
  function renderImgIxImage(renderFn: RenderFn, props: ImgIxImageProps = {}) {
    return renderFn(<ImgIxImage {...props} />);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = renderImgIxImage(create);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it.todo('should have tests');
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderImgIxImage(renderToHtml);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
