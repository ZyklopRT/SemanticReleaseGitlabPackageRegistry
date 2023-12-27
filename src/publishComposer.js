const axios = require('axios');
const SemanticReleaseError = require("@semantic-release/error");

module.exports = async (pluginConfig, context) => {
    const {
        options: {repositoryUrl, branch},
        logger,
        nextRelease
    } = context;

    if (!nextRelease.notes) {
        logger.log("No changelog generated. Skip Merge Request");
        return;
    }

    const apiUrl = `${env.CI_API_V4_URL}/projects/${env.CI_PROJECT_ID}/packages/composer`;
    const data = {
        'tag': nextRelease.version
    }
    axios.post(apiUrl, data, {
        headers: {
            'JOB-TOKEN': env.CI_JOB_TOKEN
        }
    })
        .then((res) => logger.log("Successfully published new release to gitlab package registry."))
        .catch((err) => throw new SemanticReleaseError("Could not publish release to gitlab package registry.", "EPUBLISHPACKAGE", err.message));
}