export default async ({gitlabApiUrl, gitlabProjectId}, env) => {
    return {
        gitlabToken: env.CI_JOB_TOKEN || env.GITLAB_TOKEN,
        gitlabApiUrl: env.CI_API_V4_URL || env.GITLAB_API_URL || gitlabApiUrl,
        gitlabProjectId: env.CI_PROJECT_ID || env.GITLAB_PROJECT_ID || gitlabProjectId,
    }
}