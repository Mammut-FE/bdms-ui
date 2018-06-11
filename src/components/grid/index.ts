/**
 * https://github.com/roylee0704/react-flexbox-grid
 * 用的现成的组件，api后期整理出来
 * xs: 没有media query展示的样式
 * sm: @media only screen and (min-width: 48em)
 * md: @media only screen and (min-width: 64em)
 * lg: @media only screen and (min-width: 75em)
 * - `xs`: 0..575px
 * - `sm`: 576..767px
 * - `md`: 768..991px
 * - `lg`: 992..1199px
 * - `xl`: 1200px+
 * - `.container` padding: 8px
 * - `.container` width: $breakpoint - 16px
 * - `.col-*` padding: 8px
 */
import { Col as Cols, Grid as Grids, Row as Rows } from "react-flexbox-grid";

export const Grid = Grids;
export const Row = Rows;
export const Col = Cols;
