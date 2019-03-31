# Contentful Duplicate Tool
The contentful-duplicate cli allows users to duplicate entries in Contenful from the source space environment to the target space environment. The tool is written in NodeJS.

# Getting Started
First, install the dependencies by running
```npm
npm install
```

After all the dependencies are installed, you're all set! The tool can be found in the `bin` folder.

# Running TSLint
To run tslint, use the npm `lint` command as follow:
```npm
npm run lint
```

# Usage
The following info can also be found using the help menu of the command (`contenful-duplicate --help`)

<pre>
contentful-duplicate  [--version] [--help]
                      &lt;--space-id &lt;spaceId&gt;&gt; &lt;--mToken &lt;mToken&gt;&gt; &lt;--entries &lt;entryIds,...&gt;&gt;
                      [--environment &lt;environmentName&gt;]
                      [--target-space-id &lt;targetSpaceId&gt;] [--mToken-target &lt;mTokenTarget&gt;]
                      [--target-environment &lt;targetEnvironmentId&gt;]
                      [--exclude &lt;excludeEntryIds,...&gt;]
                      [--prefix &lt;prefixString&gt;] [--suffix &lt;suffixString&gt;]
                      [&lt;--regex-pattern&gt; &lt;regexPattern&gt; &lt;--replace-str&gt; &lt;replaceString&gt;]
                      [--publish &lt;false&gt;]
                      [--is-single-level &lt;true|false&gt;]
</pre>

**NOTE**: The following flags are required:
+ --space-id
+ --mToken
+ --entries

## Example
```npm
./bin/contentful-duplicate --space-id 'uo3gy37f9r37' --mToken '90edbdc24145a4562f11f4899ed15fa5e8c7f262c86c0d38bb7be3882f0f63b4' --entries '5m1wuOCm0Jtm4FZTqUJlgb' --target-space-id 'pz8nwkyd8dfe' --prefix '[COPY] - ' --suffix '[cloned]' --regex-pattern 'HOME' --replace-str 'CONTACT' --target-environment 'dev'
```

## Flag Options
|Flag                     |Description|
|---                      |---|
| --version                |Display version information and exit.|
| --help                   |Display this help and exit.|
| --space-id               |Required*. Space ID of the source space.|
| --mToken                 |Required*. Token to access the source space.|
| --entries                |Required*. Comma separated list of entry IDs that the user would like to duplicate.|
| --environment            |Source environment name in the source space to duplicate. If not provided, default to 'master'.|
| --target-space-id        |ID of the target space. If not provided, the target space will be the same as the source space.|
| --mToken-target          |Token to access the target space. If not provided, use the same value as mToken.|
| --target-environment     |Target environment name in the target space to duplicate to. If not provided, use the same name as source environment name.|
| --exclude                |Comma separated list of entry IDs to exclude when duplicating.|
| --prefix                 |String to prefix to the titles of all the entries when duplicating to target.|
| --suffix                 |String to suffix to titles of all entries when duplicating to target.|
| --regex-pattern          |Regex pattern to search in titles of entries when duplicating to target. This flag input is required if --replace-str is provided.|
| --replace-str            |String to replace the regex pattern with in titles of entries when duplicating to target. This flag input is required if --regex-pattern is provided.|
| --publish                |The only valid option is false. If set to false, the states of the duplicated entries in target will be draft. If not provided, the states of the duplicated entries in target will be the same as source.|
| --is-single-level        |Default value is false. If set to true, only the first level entries will be duplicated to target. Child entries won't be duplicated.|