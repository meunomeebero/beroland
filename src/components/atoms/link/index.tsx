import NextLink from "next/link";
import { LinkProps } from "./link-props";

/**
 * Componente de link que encapsula o NextLink para fornecer estilos e funcionalidades consistentes
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