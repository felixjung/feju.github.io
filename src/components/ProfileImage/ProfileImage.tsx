import React, { FunctionComponent, ImgHTMLAttributes } from 'react';
import Img from 'react-optimized-image';

import profileImage from '../../images/profile.jpg';

/**
 * Responsive profile image.
 */
export const ProfileImage: FunctionComponent<ImgHTMLAttributes<
  HTMLImageElement
>> = (props) => (
  <Img
    {...props}
    src={profileImage}
    alt="Profile image of Felix wearing a blue baseball cap"
    webp
    sizes={[128, 256, 512]}
    densities={[1, 2, 3]}
  />
);
