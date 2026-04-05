import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="mt-12 mb-6 text-3xl md:text-4xl" {...props} />,
  h2: (props) => <h2 className="mt-12 mb-4 text-2xl md:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-xl md:text-2xl" {...props} />,
  p: (props) => <p className="my-5 text-ink" {...props} />,
  a: ({ href = "", children, ...rest }) => {
    const isExternal = href.startsWith("http");
    const className =
      "body-link text-ink decoration-spray decoration-[2.5px] underline underline-offset-[4px] hover:bg-marker hover:text-ink transition-colors";
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={className} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  },
  ul: (props) => <ul className="my-5 ml-6 list-disc marker:text-spray" {...props} />,
  ol: (props) => <ol className="my-5 ml-6 list-decimal marker:text-ink-muted" {...props} />,
  li: (props) => <li className="my-1.5" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 pl-5 border-l-4 border-spray italic text-ink-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-ink-muted/20" />,
  code: (props) => (
    <code
      className="font-mono text-[0.9em] px-1.5 py-0.5 bg-wall-deep border border-ink/10 rounded-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 p-4 bg-wall-deep border border-ink/10 rounded-sm overflow-x-auto text-[0.9375rem] leading-relaxed [&>code]:!bg-transparent [&>code]:!border-0 [&>code]:!p-0"
      {...props}
    />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="my-6 w-full border border-ink/10" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  em: (props) => <em className="italic" {...props} />,
};
