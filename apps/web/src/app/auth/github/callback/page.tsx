import dynamic from 'next/dynamic';

const GithubOAuthCallbackPage = dynamic(() => import('@/components/githubOAuthCallbackPage/GithubOAuthCallbackPage'), {
  ssr: false,
});

export default function Page() {
  return <GithubOAuthCallbackPage />;
}
