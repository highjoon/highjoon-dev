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
import { type MergeComponents } from '@mdx-js/react/lib';
import { Info } from 'lucide-react';
import { type MDXComponents as MDXComponentsType } from 'mdx/types';

const createHeadingId = (text: string | React.ReactNode): string => {
  const textContent = typeof text === 'string' ? text : String(text);
  return textContent
    .toLowerCase()
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-');
};

export const MdxComponents: MDXComponentsType | MergeComponents | null | undefined = {
  h1: (props) => {
    const id = createHeadingId(props.children);
    return <h1 {...props} id={id} className={cn('text-4xl font-bold mb-10 mt-10', props.className)} ref={props.ref} />;
  },
  h2: (props) => {
    const id = createHeadingId(props.children);
    return (
      <>
        <Separator className="my-8 md:my-7 sm:my-5" />
        <h2
          {...props}
          id={id}
          className={cn('text-3xl font-semibold mb-8 md:text-2xl md:mb-3 sm:text-xl sm:mb-3', props.className)}
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
          'text-2xl font-semibold mt-5 mb-5 md:text-xl md:mt-3 md:mb-3 sm:text-lg sm:mt-3 sm:mb-3',
          props.className,
        )}
        ref={props.ref}
      />
    );
  },
  h4: (props) => {
    const id = createHeadingId(props.children);
    return <h4 {...props} id={id} className={cn('text-xl font-semibold my-3', props.className)} ref={props.ref} />;
  },
  h5: (props) => {
    const id = createHeadingId(props.children);
    return <h5 {...props} id={id} className={cn('text-lg font-semibold my-3', props.className)} ref={props.ref} />;
  },
  h6: (props) => {
    const id = createHeadingId(props.children);
    return <h6 {...props} id={id} className={cn('text-base font-semibold my-3', props.className)} ref={props.ref} />;
  },
  p: (props) => (
    <p
      {...props}
      className={cn('my-1 leading-7', props.className)}
      ref={props.ref as React.Ref<HTMLParagraphElement>}
    />
  ),
  span: (props) => (
    <span
      {...props}
      className={cn('text-base leading-7', props.className)}
      ref={props.ref as React.Ref<HTMLSpanElement>}
    />
  ),
  ul: (props) => (
    <ul {...props} className={cn('list-disc list-inside space-y-1 sm:pl-2.5', props.className)} ref={props.ref} />
  ),
  ol: (props) => (
    <ol {...props} className={cn('list-decimal list-inside space-y-1', props.className)} ref={props.ref} />
  ),
  li: (props) => (
    <li {...props} className={cn('my-1 leading-7 pr-5', props.className)} ref={props.ref as React.Ref<HTMLLIElement>} />
  ),
  code: (props) => (
    <code
      {...props}
      className={cn('rounded px-1 py-0.5 text-sm font-medium', props.className)}
      ref={props.ref as React.Ref<HTMLElement>}
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className={cn(
        'my-3 rounded-lg bg-gray-900 dark:bg-gray-950 p-4 text-sm text-white overflow-x-auto',
        '[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm [&_code_*]:text-sm',
        props.className,
      )}
      ref={props.ref as React.Ref<HTMLPreElement>}
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className={cn(
        'my-8 border-l-4 border-primary pl-5 pr-5 py-4 rounded-r-lg bg-muted/50 md:my-5 md:p-5',
        props.className,
      )}
      ref={props.ref as React.Ref<HTMLQuoteElement>}>
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
        <div className="flex-1">{props.children}</div>
      </div>
    </blockquote>
  ),
  a: (props) => (
    <a
      {...props}
      className={cn(
        'text-primary underline decoration-primary underline-offset-2 hover:text-primary hover:decoration-primary/70 transition-colors',
        props.className,
      )}
      ref={props.ref as React.Ref<HTMLAnchorElement>}
    />
  ),
  strong: (props) => (
    <strong
      {...props}
      className={cn('font-bold text-primary', props.className)}
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
