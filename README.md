# @jjansen/semantic-release-gitlab-composer-package

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a composer package to the [gitlab package registry](https://docs.gitlab.com/ee/user/packages/composer_repository/).

[![npm latest version](https://img.shields.io/npm/v/@jjansen/semantic-release-gitlab-composer-package/latest.svg)](https://www.npmjs.com/package/@jjansen/semantic-release-gitlab-composer-package)

| Step               | Description                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the presence of the `composer.json` file and Gitlab Token, API url and project id environment variables. |
| `publish`          | [Publish the composer package](https://getcomposer.org) to the gitlab package registry.                         |

## Install

```bash
$ npm install @jjansen/semantic-release-gitlab-composer-package -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": ["@semantic-release/commit-analyzer", "@semantic-release/release-notes-generator", "@jjansen/semantic-release-gitlab-composer-package"]
}
```
## Configuration

### Environment variables

| Variable                               | Description                                                                                                                           |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `CI_JOB_TOKEN` or `GITLAB_TOKEN`       | The Gitlab access token created via e.g [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) |
| `CI_API_V4_URL` or `GITLAB_API_URL`    | The Gitlab API root URL (intended for v4) e.g. `https://gitlab.company.com/api/v4`                                                    |
| `CI_PROJECT_ID` or `GITLAB_PROJECT_ID` | The Gitlab project id used to publish the composer package to.                                                                        |

Keep in mind that the [Gitlab predefined CI/CD variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) win over the environment variables.

### Plugin Configuration

Alternatively, the gitlab API URL (`gitlabApiUrl`) and the project id (`gitlabProjectId`) can be set via plugin config.

> However, the environment variables win over the plugin config.
> Also, the access token needs to be defined as environment variable for security reasons.

#### Examples 

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@jjansen/semantic-release-gitlab-composer-package",
      {
        "gitlabApiUrl": "https://www.gitlab.company.de/api/v4",
        "gitlabProjectId": "123"
      }
    ]
  ]
}
```

## Notes

### Access token
The access token needs permissions to publish to the package registry. Normally the gitlab predefined job token has enough permissions granted.

### Publish composer URL

The URL for publishing to the gitlab package registry is directly from the gitlab docs:
`${gitlabApiUrl}/projects/${gitlabProjectId}/packages/composer`