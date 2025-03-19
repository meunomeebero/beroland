import { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

/**
 * Extended props interface for the Link component
 */
export interface LinkProps extends NextLinkProps {
  /** Content to be rendered inside the link */
  children: ReactNode;
  
  /** Target attribute to open in a new tab or define navigation behavior */
  target?: string;
  
  /** Additional props to be passed to the <a> element */
  aProps?: React.CSSProperties;
}