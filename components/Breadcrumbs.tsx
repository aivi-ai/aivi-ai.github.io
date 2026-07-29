import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { company } from '@/content/company';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: Props) {
  const jsonLdItems = items.map((item) => ({
    name: item.name,
    url: item.href.startsWith('http')
      ? item.href
      : `${company.siteUrl}${item.href}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(jsonLdItems)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {isLast ? (
                  <span
                    className="text-sm"
                    style={{ color: 'var(--color-ink-muted)' }}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="text-sm"
                      style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                    <span
                      aria-hidden="true"
                      className="text-sm"
                      style={{ color: 'var(--color-line)' }}
                    >
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
