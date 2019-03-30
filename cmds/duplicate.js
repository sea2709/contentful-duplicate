const contentful = require('contentful-management');
const ora = require('ora');
const error = require('../utils/error');
const duplicateEntry = require('../utils/duplicateEntry');

const spinner = ora();

const getContentTypes = async (sourceEnv, targetEnv) => {
  const sourceContentTypes = sourceEnv.getContentTypes();
  const targetContentTypes = targetEnv.getContentTypes();

  return {
    'source': sourceContentTypes,
    'target': targetContentTypes
  }
}

const duplicateEntries = async (
  entries, sourceEnv, publish, exclude, singleLevel, targetEnv, prefix, suffix, regex, replaceStr,
) => {
  const sourceContentTypes = await sourceEnv.getContentTypes();
  const targetContentTypes = await targetEnv.getContentTypes();
  console.log(sourceContentTypes.items, targetContentTypes.items);
  process.exit(1);

  entries.forEach((entryId) => {
    duplicateEntry(entryId, sourceEnv, publish, exclude, singleLevel, targetEnv,
      prefix, suffix, regex, replaceStr).then((entry) => {
      const entryNameObj = entry.fields.name;
      const firstKeyName = Object.keys(entry.fields.name)[0];
      spinner.info(`Duplicate entry ${entryId} successfully. New entry #${entry.sys.id} - ${entryNameObj[firstKeyName]}`);
    });
  });
};

module.exports = async (args) => {
  const spaceId = args['space-id'];
  const accessToken = args.mToken;
  const entries = args.entries.split(',');
  const exclude = args.exclude.split(',');
  const environment = args.environment || 'master';
  const targetEnvironment = args['target-environment'] || environment;

  spinner.start();
  const client = contentful.createClient({
    accessToken,
  });
  const sourceEnv = await client.getSpace(spaceId)
    .then(space => space.getEnvironment(environment))
    .catch(err => error(err.message, true));

  let targetEnv = sourceEnv;
  if (args['target-space-id']) {
    const targetClient = contentful.createClient({
      accessToken: args['mToken-target'] ? args['mToken-target'] : accessToken,
    });

    targetEnv = await targetClient.getSpace(args['target-space-id'])
      .then(space => space.getEnvironment(targetEnvironment))
      .catch(err => error(err.message, true));
  }

  let regex = null;
  if (args['regex-pattern'] && args['replace-str']) {
    regex = new RegExp(args['regex-pattern']);
  }

  spinner.info(`Start duplcate entries : [${args.entries}]`);

  await duplicateEntries(
    entries, sourceEnv, args.publish, exclude, args['single-level'], targetEnv, args.prefix, args.suffix, regex, args['replace-str'],
  );

  spinner.stop();
};
