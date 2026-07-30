import { type ReactNode } from 'react';

type Role = 'body' | 'raised' | 'closing';

interface Props {
  role?: Role;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ role = 'body', children, className = '', id }: Props) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 role-${role} ${className}`}
    >
      {children}
    </section>
  );
}
