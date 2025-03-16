export async function generateMetadata() {
  return {
    title: 'Tags | highjoon-dev',
  };
}

export default async function Page() {
  // const postList = await getPostList();
  // const allTags = getAllTagsFromPosts({ postList: postList.responseObject });
  // const tagWithCount = countTags(allTags);

  return (
    // <Flex direction="column" gap={30}>
    //   <Title component="h1" order={3}>
    //     TAGS
    //   </Title>
    //   <Flex gap={10} wrap="wrap">
    //     {tagWithCount.map((tagCount) => {
    //       const tag = Object.keys(tagCount)[0];
    //       const count = tagCount[tag];

    //       return (
    //         <Link key={uuid() + tag} href={ROUTES.TAGS + `/${tag}/1`}>
    //           <Badge variant="outline" size="lg" style={{ cursor: 'pointer' }}>
    //             #&nbsp;{tag}&nbsp;
    //             <Text component="span" fw="inherit" fz="inherit" lh="inherit">
    //               {count}
    //             </Text>
    //           </Badge>
    //         </Link>
    //       );
    //     })}
    //   </Flex>
    // </Flex>

    null
  );
}
