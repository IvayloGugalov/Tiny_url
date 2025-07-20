import { Typography as AntTypography } from 'antd';
import { ReactNode } from 'react';

const { Title: AntTitle, Paragraph: AntParagraph, Link: AntLink } = AntTypography;

export interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: React.CSSProperties;
}

export function Title({ children, level = 1, ...props }: TitleProps) {
  return (
    <AntTitle level={level} {...props}>
      {children}
    </AntTitle>
  );
}

export interface ParagraphProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Paragraph({ children, ...props }: ParagraphProps) {
  return (
    <AntParagraph {...props}>
      {children}
    </AntParagraph>
  );
}

export interface LinkProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Link({ children, ...props }: LinkProps) {
  return (
    <AntLink {...props}>
      {children}
    </AntLink>
  );
}