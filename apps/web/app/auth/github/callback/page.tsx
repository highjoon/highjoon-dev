import dynamic from 'next/dynamic';

const GithubOAuthCallbackPage = dynamic(() => import('@/page/auth/ui/GithubOAuthCallbackPage'), {
  ssr: false,
});

export default function Page() {
  return <GithubOAuthCallbackPage />;
}
