import { type Nullable } from "@highjoon-dev/types";

export type GithubUserData = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: Nullable<string>;
  hireable: Nullable<string>;
  bio: string;
  twitter_username: Nullable<string>;
  notification_email: Nullable<string>;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
};

export type UserRole = "USER" | "ADMIN";

export type UserData = {
  id: string;
  name: GithubUserData["name"];
  homeUrl: GithubUserData["html_url"];
  avatarUrl: GithubUserData["avatar_url"];
  role: UserRole;
};

export type TokenData = {
  userId: string;
  role: UserRole;
  exp: number;
  iat: number;
};

export type LikedPost = {
  createdAt: Date;
  id: string;
  postId: string;
  userId: string;
};
