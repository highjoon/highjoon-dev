import { RiInformationFill } from 'react-icons/ri';
import {
  Anchor,
  Blockquote,
  Code,
  Divider,
  List,
  ListItem,
  PolymorphicRef,
  rem,
  Table,
  TableCaption,
  TableTbody,
  TableTd,
  TableTfoot,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Title,
} from '@mantine/core';
import { MergeComponents } from '@mdx-js/react/lib';
import { MDXComponents as MDXComponentsType } from 'mdx/types';
import styles from './MdxComponents.module.scss';

export const MdxComponents: MDXComponentsType | MergeComponents | null | undefined = {
  h1: (props) => <Title order={1} {...props} my={40} />,
  h2: (props) => (
    <>
      <Divider className={styles['h2-divider']} />
      <Title order={2} {...props} className={styles.h2} />
    </>
  ),
  h3: (props) => <Title order={3} {...props} className={styles.h3} />,
  h4: (props) => <Title order={4} {...props} my={10} />,
  h5: (props) => <Title order={5} {...props} my={10} />,
  h6: (props) => <Title order={6} {...props} my={10} />,
  p: (props) => <Text {...props} className={styles.p} ref={props.ref as PolymorphicRef<'p'>} component="p" />,
  span: (props) => <Text {...props} ref={props.ref as PolymorphicRef<'span'>} component="span" size="md" lh="lg" />,
  ul: (props) => (
    <List {...props} className={styles.ul} type="unordered" component="ul" spacing="sm" listStyleType="disc" />
  ),
  ol: (props) => <List {...props} type="ordered" component="ol" spacing="sm" center withPadding listStyleType="disc" />,
  li: (props) => (
    <ListItem
      {...props}
      ref={props.ref as PolymorphicRef<HTMLLIElement>}
      classNames={{ itemWrapper: styles['list-item-wrapper'] }}
      my={5}
      lh="lg"
    />
  ),
  code: (props) => <Code {...props} color="indigo.1" className={styles.code} />,
  pre: (props) => <Code block {...props} my={10} className={styles.pre} bg="dark" p="md" />,
  blockquote: (props) => (
    <Blockquote
      {...props}
      className={styles.blockquote}
      mb={10}
      radius="lg"
      icon={<RiInformationFill style={{ width: rem(20), height: rem(20) }} />}></Blockquote>
  ),
  a: (props) => <Anchor {...props} ref={props.ref as PolymorphicRef<HTMLAnchorElement>} />,
  strong: (props) => (
    <Text {...props} ref={props.ref as PolymorphicRef<HTMLElement>} component="strong" c="indigo.8" fw="bold" />
  ),
  table: (props) => <Table {...props} striped highlightOnHover withTableBorder withColumnBorders my={10} />,
  caption: (props) => <TableCaption {...props} ref={props.ref as PolymorphicRef<HTMLTableCaptionElement>} />,
  thead: (props) => <TableThead {...props} />,
  tbody: (props) => <TableTbody {...props} />,
  tfoot: (props) => <TableTfoot {...props} />,
  tr: (props) => <TableTr {...props} />,
  th: (props) => <TableTh {...props} />,
  td: (props) => <TableTd {...props} />,
};
