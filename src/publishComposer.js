import axios from 'axios';
import apiUrl from "./apiUrl.js";

export default async (pluginConfig, context) => {
    const {
        options: {repositoryUrl, branch},
        logger,
        nextRelease,
        env
    } = context;

    if (!nextRelease?.gitTag) {
        logger.log("No git tag for next release found. Skip publishing composer package.");
        return;
    }

    const {gitlabToken, gitlabApiUrl, gitlabProjectId} = await apiUrl(pluginConfig, env)

    const apiUrlValue = `${gitlabApiUrl}/projects/${gitlabProjectId}/packages/composer`;
    const data = {
        'tag': nextRelease.gitTag
    }
    axios.post(apiUrlValue, data, {
        headers: {
            'JOB-TOKEN': gitlabToken
        }
    })
        .then((res) => logger.log(`Successfully published ${nextRelease.gitTag} composer package.`))
        .catch((err) => console.error(err));
}