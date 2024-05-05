import { Flex, Title } from '@mantine/core';
import AboutMe from '@/components/aboutMe/AboutMe';

export async function generateMetadata() {
  return {
    title: 'About',
  };
}

export default function Page() {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3}>
        ABOUT
      </Title>
      <AboutMe />
    </Flex>
  );
}
