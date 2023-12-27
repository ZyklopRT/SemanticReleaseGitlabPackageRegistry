import fs from 'fs';
import SemanticReleaseError from "@semantic-release/error";
import AggregateError from "aggregate-error";
import apiUrl from "./apiUrl.js";

export default async (pluginConfig, context) => {
    const {
        cwd,
        env,
        logger,
    } = context;
    const composerJsonFile = `${cwd}/composer.json`;
    const errors = [];

    if (fs.existsSync(composerJsonFile)) {
        logger.log('composer.json found in %s.', cwd);
    } else {
        errors.push(new SemanticReleaseError(`${composerJsonFile} not found.`, 'EVERIFYCOMPOSER', 'This semantic release plugin requires composer to work.'));
    }

    const {gitlabToken, gitlabApiUrl, gitlabProjectId} = await apiUrl(pluginConfig, env)

    if (!gitlabToken) {
        errors.push(new SemanticReleaseError(`Access token not recognized. Please review your configuration.`, 'EVERIFYACCESS', 'Did you forgot to set one of the following environment variables (CI_JOB_TOKEN || GL_TOKEN || GITLAB_TOKEN)?'));
    }

    if (!gitlabApiUrl) {
        errors.push(new SemanticReleaseError(`Unable to determine Gitlab API URL. Please review your configuration.`, 'EVERIFYAPIURL', 'Did you forgot to set one of the following environment variables (((GL_URL || GITLAB_URL) && (GL_PREFIX || GITLAB_PREFIX)) || CI_API_V4_URL)?'));
    }

    if (!gitlabProjectId) {
        errors.push(new SemanticReleaseError(`Project ID not identified. Please review your configuration.`, 'EVERIFYPROJECTID', 'Did you forgot to set one of the following environment variables (GL_PROJECT_ID || GITLAB_PROJECT_ID || CI_PROJECT_ID)?'));
    }

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }

    return true;
}