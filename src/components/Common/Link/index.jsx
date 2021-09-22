import Link from 'next/link';

const LinkComponent = props => {
  const { children, className, href = "#", title, target = '_blank' } = props;
  const isExternal = (href && href.indexOf('http') !== -1) || (href && href[0] === '#');
  if (isExternal) {
    return (
      <a
        href={href}
        className={className || ''}
        title={title || null}
        target={target}
        rel="nofollow noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a href={href} className={className || ''} title={title || null}>
        {children}
      </a>
    </Link>
  );
};

export default LinkComponent;
