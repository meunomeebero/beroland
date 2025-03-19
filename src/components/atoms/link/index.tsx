import NextLink from "next/link";
import { LinkProps } from "./link-props";

/**
 * Link component that encapsulates NextLink to provide consistent styles and functionality
 */
export function Link({ 
  href, 
  children, 
  target,
  aProps,
  ...props 
}: LinkProps) {
  return (
    <NextLink href={href} {...props} target={target} style={{...aProps}}>
      {children}
    </NextLink>
  );
}