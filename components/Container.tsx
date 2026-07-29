import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: Props) {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
