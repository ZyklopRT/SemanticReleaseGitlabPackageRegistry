export default async ({gitlabApiPathPrefix, gitlabUrl}, env) => {
    gitlabUrl = gitlabUrl || env.GL_URL || env.GITLAB_URL;
    gitlabApiPathPrefix =
        typeof gitlabApiPathPrefix === 'string'
            ? gitlabApiPathPrefix
            : typeof env.GL_PREFIX === 'string'
                ? env.GL_PREFIX
                : typeof env.GITLAB_PREFIX === 'string'
                    ? env.GITLAB_PREFIX
                    : null;

    let gitlabApiUrl;
    if (!gitlabUrl || !gitlabApiPathPrefix) {
        gitlabApiUrl = env.CI_API_V4_URL;
    } else {
        gitlabApiUrl = `${gitlabUrl}/${gitlabApiPathPrefix}`
    }

    return {
        gitlabToken: env.CI_JOB_TOKEN || env.GL_TOKEN || env.GITLAB_TOKEN,
        gitlabApiUrl: gitlabApiUrl,
        gitlabProjectId: env.GL_PROJECT_ID || env.GITLAB_PROJECT_ID || env.CI_PROJECT_ID,
    }
}