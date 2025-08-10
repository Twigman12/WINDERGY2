declare module '@react-three/fiber' {
  import { ReactElement } from 'react';
  
  export interface ThreeElements {
    group: any;
    mesh: any;
    ambientLight: any;
    directionalLight: any;
    pointLight: any;
    gridHelper: any;
    primitive: any;
  }
  
  export function Canvas(props: any): ReactElement;
  export function useFrame(callback: (state: any) => void): void;
  export function useThree(): any;
}

declare module '@react-three/drei' {
  import { ReactElement } from 'react';
  
  export function OrbitControls(props: any): ReactElement;
  export function Text(props: any): ReactElement;
}

declare module 'react-spring' {
  import { ReactElement, ComponentType } from 'react';
  
  export function useSpring(props: any): any;
  export function animated<T extends ComponentType<any>>(component: T): T;
  export const animated: {
    div: ComponentType<any>;
    nav: ComponentType<any>;
    span: ComponentType<any>;
    button: ComponentType<any>;
    section: ComponentType<any>;
    [key: string]: ComponentType<any>;
  };
}

declare module 'react-spring/web' {
  export * from 'react-spring';
}
