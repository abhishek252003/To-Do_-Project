import type { GitHubBranchResponse, GitHubInfoResponse, GitHubRepoResponse } from "../types/github";
import { showToast } from "../utils";

export const fetchGitHubInfo = async (): Promise<GitHubInfoResponse> => {
  const username = "abhishek252003";
  const repo = "To-Do_-Project";
  const branch = "main";
  try {
    const [repoResponse, branchResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${username}/${repo}`),
      fetch(`https://api.github.com/repos/${username}/${repo}/branches/${branch}`),
    ]);

    if (repoResponse.ok && branchResponse.ok) {
      const [repoData, branchData] = await Promise.all([
        repoResponse.json() as Promise<GitHubRepoResponse>,
        branchResponse.json() as Promise<GitHubBranchResponse>,
      ]);
      return {
        repoData,
        branchData,
      };
    } else {
      throw new Error("Failed to fetch repository or branch information");
    }
  } catch (error) {
    console.error(error);
    showToast("Failed to fetch github api.", { type: "error" });
    return { repoData: {} as GitHubRepoResponse, branchData: {} as GitHubBranchResponse };
  }
};
