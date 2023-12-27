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
        errors.push(new SemanticReleaseError(`${composerJsonFile} not found.`, 'EVERIFYCOMPOSER'));
    }

    const {gitlabToken, gitlabApiUrl, gitlabProjectId} = apiUrl(pluginConfig, env)

    if (!gitlabToken) {
        errors.push(new SemanticReleaseError(`Access token variable could not be guessed.`, 'EVERIFYACCESS'));
    }

    if (!gitlabApiUrl) {
        errors.push(new SemanticReleaseError(`API url variable could not be guessed.`, 'EVERIFYAPIURL'));
    }

    if (!gitlabProjectId) {
        errors.push(new SemanticReleaseError(`Project id variable could not be guessed.`, 'EVERIFYPROJECTID'));
    }

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }

    return true;
}