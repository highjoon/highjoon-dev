import React from 'react';
import { Separator } from '@highjoon-dev/ui/components/Separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@highjoon-dev/ui/components/Table';
import { cn } from '@highjoon-dev/ui/lib/utils';
import { Info } from 'lucide-react';
import { type MDXComponents } from 'mdx/types';

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
};

const createHeadingId = (node: React.ReactNode): string => {
  const id = extractText(node)
    .toLowerCase()
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-');
  return /^\d/.test(id) ? `heading-${id}` : id;
};

export const MdxComponents: MDXComponents = {
  h1: (props) => {
    const id = createHeadingId(props.children);
    return (
      <h1
        {...props}
        id={id}
        className={cn('text-4xl font-bold mb-10 mt-10 text-vibrant-text-main', props.className)}
        ref={props.ref}
      />
    );
  },
  h2: (props) => {
    const id = createHeadingId(props.children);
    return (
      <>
        <Separator className="mt-12 mb-0 md:mt-10 sm:mt-8 bg-vibrant-border-color" />
        <h2
          {...props}
          id={id}
          className={cn(
            'text-3xl font-bold mt-4 mb-6 md:text-2xl md:mt-3 md:mb-4 sm:text-xl sm:mt-3 sm:mb-3 text-vibrant-brand',
            props.className,
          )}
          ref={props.ref}
        />
      </>
    );
  },
  h3: (props) => {
    const id = createHeadingId(props.children);
    return (
      <h3
        {...props}
        id={id}
        className={cn(
          'text-2xl font-bold mt-8 mb-4 md:text-xl md:mt-6 md:mb-3 sm:text-lg sm:mt-5 sm:mb-2 text-vibrant-text-main',
          props.className,
        )}
        ref={props.ref}
      />
    );
  },
  h4: (props) => {
    const id = createHeadingId(props.children);
    return (
      <h4
        {...props}
        id={id}
        className={cn('text-xl font-semibold my-3 text-vibrant-text-main', props.className)}
        ref={props.ref}
      />
    );
  },
  h5: (props) => {
    const id = createHeadingId(props.children);
    return (
      <h5
        {...props}
        id={id}
        className={cn('text-lg font-semibold my-3 text-vibrant-text-main', props.className)}
        ref={props.ref}
      />
    );
  },
  h6: (props) => {
    const id = createHeadingId(props.children);
    return (
      <h6
        {...props}
        id={id}
        className={cn('text-base font-semibold my-3 text-vibrant-text-main', props.className)}
        ref={props.ref}
      />
    );
  },
  p: (props) => (
    <p
      {...props}
      className={cn('my-3 leading-8 text-vibrant-text-main', props.className)}
      ref={props.ref as React.Ref<HTMLParagraphElement>}
    />
  ),
  span: (props) => (
    <span
      {...props}
      className={cn('text-base leading-7 text-vibrant-text-main', props.className)}
      ref={props.ref as React.Ref<HTMLSpanElement>}
    />
  ),
  ul: (props) => (
    <ul {...props} className={cn('list-disc list-outside pl-5 space-y-2', props.className)} ref={props.ref} />
  ),
  ol: (props) => (
    <ol {...props} className={cn('list-decimal list-outside pl-5 space-y-2', props.className)} ref={props.ref} />
  ),
  li: (props) => (
    <li {...props} className={cn('my-1 leading-8', props.className)} ref={props.ref as React.Ref<HTMLLIElement>} />
  ),
  code: (props) => (
    <code
      {...props}
      className={cn(
        'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded px-1.5 py-0.5 text-sm font-mono font-medium',
        props.className,
      )}
      ref={props.ref as React.Ref<HTMLElement>}
    />
  ),
  pre: (props) => (
    <div
      className={cn(
        'my-3 rounded-xl border border-gray-800 dark:border-gray-700 overflow-hidden bg-gray-900 dark:bg-gray-950',
      )}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
      </div>
      <pre
        {...props}
        className={cn(
          'px-4 pb-4 pt-3 text-sm text-white overflow-x-auto',
          '[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm [&_code_*]:text-sm',
          props.className,
        )}
        ref={props.ref as React.Ref<HTMLPreElement>}
      />
    </div>
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className={cn(
        'my-8 border-l-[3px] border-vibrant-brand pl-5 pr-5 py-4 rounded-r-xl bg-vibrant-brand-light/20 dark:bg-vibrant-brand/10 md:my-5 md:p-5',
        props.className,
      )}
      ref={props.ref as React.Ref<HTMLQuoteElement>}>
      <div className="flex items-start gap-3">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-vibrant-brand" />
        <div className="flex-1 italic text-vibrant-text-main">{props.children}</div>
      </div>
    </blockquote>
  ),
  a: (props) => (
    <a
      {...props}
      className={cn(
        'text-vibrant-brand underline decoration-vibrant-brand underline-offset-2 hover:text-vibrant-brand-dark hover:decoration-vibrant-brand-dark/70 transition-colors',
        props.className,
      )}
      ref={props.ref as React.Ref<HTMLAnchorElement>}
    />
  ),
  strong: (props) => (
    <strong
      {...props}
      className={cn('font-bold text-vibrant-brand', props.className)}
      ref={props.ref as React.Ref<HTMLElement>}
    />
  ),
  table: (props) => (
    <div className="my-3">
      <Table {...props} className={cn('border-collapse border', props.className)} />
    </div>
  ),
  caption: (props) => (
    <TableCaption {...props} className={cn('mt-4 text-sm text-muted-foreground', props.className)} ref={props.ref} />
  ),
  thead: (props) => <TableHeader {...props} ref={props.ref} />,
  tbody: (props) => <TableBody {...props} ref={props.ref} />,
  tfoot: (props) => <TableFooter {...props} ref={props.ref} />,
  tr: (props) => <TableRow {...props} className={cn('border-b hover:bg-muted/50', props.className)} ref={props.ref} />,
  th: (props) => <TableHead {...props} className={cn('border p-2 font-medium', props.className)} ref={props.ref} />,
  td: (props) => <TableCell {...props} className={cn('border p-2', props.className)} ref={props.ref} />,
};
