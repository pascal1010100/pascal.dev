// Tipos para react-p5
declare module 'react-p5' {
  import { Component } from 'react';
  import * as P5 from 'p5';

  export type P5Instance = P5 & {
    [key: string]: any;
  };

  export interface SketchProps {
    setup: (p: P5Instance, canvasParentRef: Element) => void;
    draw?: (p: P5Instance) => void;
    windowResized?: (p: P5Instance) => void;
    preload?: (p: P5Instance) => void;
    mouseClicked?: (p: P5Instance) => void;
  }

  export default class Sketch extends Component<SketchProps> {}
}
