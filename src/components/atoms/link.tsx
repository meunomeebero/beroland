import NextLink, { LinkProps } from "next/link";

export function Link({ 
  href, 
  children, 
  target,
  aProps,
  ...props 
}: LinkProps & { children: any, target?: string, aProps?: any }) {
  return (
    <NextLink passHref={true} href={href} {...props}>
      <a target={target} style={{...aProps}}>
        {children}
      </a>
    </NextLink>
  );
}