import axios from 'axios';
import SemanticReleaseError from "@semantic-release/error";

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

    const apiUrl = `${env.CI_API_V4_URL}/projects/${env.CI_PROJECT_ID}/packages/composer`;
    const data = {
        'tag': nextRelease.gitTag
    }
    axios.post(apiUrl, data, {
        headers: {
            'JOB-TOKEN': env.CI_JOB_TOKEN
        }
    })
        .then((res) => logger.log(`Successfully published ${nextRelease.gitTag} composer package.`))
        .catch((err) => console.error(err));
}