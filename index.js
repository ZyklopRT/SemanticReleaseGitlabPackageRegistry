import verify from './src/verify.js';
import publishComposer from './src/publishComposer.js';

let verified;

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
export async function verifyConditions(pluginConfig, context) {
    await verify(pluginConfig, context);
    verified = true;
}

export async function publish(pluginConfig, context) {

    if (!verified) {
        await verifyConditions(pluginConfig, context);
    }
    await publishComposer(pluginConfig, context);
}