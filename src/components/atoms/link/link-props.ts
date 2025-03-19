import { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

/**
 * Interface de props estendida para o componente Link
 */
export interface LinkProps extends NextLinkProps {
  /** Conteúdo a ser renderizado dentro do link */
  children: ReactNode;
  
  /** Atributo target para abrir em nova aba ou definir comportamento de navegação */
  target?: string;
  
  /** Props adicionais a serem passadas para o elemento <a> */
  aProps?: React.CSSProperties;
}