import verify from './src/verify';
import publishComposer from './src/publishComposer';

let verified;

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function verifyConditions(pluginConfig, context) {
    await verify(pluginConfig, context);
    verified = true;
}

async function publish(pluginConfig, context) {

    if (!verified) {
        await verifyConditions(pluginConfig, context);
    }
    await publishComposer(pluginConfig, context);
}

module.exports = { verifyConditions, publish };