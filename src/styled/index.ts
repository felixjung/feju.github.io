import styled, { CreateStyled } from '@emotion/styled';
import type { Theme } from '@felixjung/plastuiq';

export default styled as CreateStyled<Theme>;

export interface StyleProps {
  theme: Theme;
}
