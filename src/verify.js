import fs from 'fs';
import SemanticReleaseError from "@semantic-release/error";
import AggregateError from "aggregate-error";

module.exports = async (pluginConfig, context) => {
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

    if (!env.CI_JOB_TOKEN || !env.CI_PROJECT_ID || !env.CI_API_V4_URL) {
        errors.push(new SemanticReleaseError(`Gitlab predefined CI/CD variables $CI_JOB_TOKEN, $CI_PROJECT_ID, $CI_API_V4_URL not found.`, 'EVERIFYCIVARS'));
    }

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }

    return true;
}