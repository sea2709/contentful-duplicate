# contentful-duplicate
Recursively duplicates entries in/between Contentful spaces.

## Deployment and Execution
1.  You should have the following prerequisites:
    - NodeJS 11.5.0 (other recent versions should also work fine);
    - Contentful account (https://www.contentful.com/)
    - Create an access token to access Contentful Management API https://www.contentful.com/developers/docs/references/content-management-api/#/introduction/authentication
     
2. Execution
    `npm install`
    `./bin/contentful-duplicate --options` (check ./bin/contentful-duplicate --help for more details)
    Run `npm link` in the root of your project will symlink your binary file to the system path, making it accessible from anywhere by running `contentful-duplicate` [Optional]

3. Run linters 
    `npm run lint`

## Test cases
The file `samples/contentful-data.json` can be used to create some dummy data for testing purpose (import content types and content).

1. Duplicate published entries recursively in a same space
Duplicate HOME PAGE to CONTACT PAGE, add prefix [COPY] and suffix [cloned]
https://monosnap.com/file/zSBXsGYPmxY4jHb2BlBnNEDiME7fmp

2. Duplicate published entries recursively in a same space, but do not publish new entries
https://monosnap.com/file/cw59f4Ix5pnVx4l3r3Fq0UoRSUzsfg

3. Duplicate published entries recursively in a different space
Duplicated entry banner is draft because it doesn't have the asset (which is a required field for background image)
https://monosnap.com/file/jeO2HW6AtWqDc2varjBgpf92n1jiTJ

4. Duplicate published entries recursively in a different space missing content type
https://monosnap.com/file/ihQ5EYO9SjQJo4WXI7SFK0vDekvQcG

5. Duplicate single level
https://monosnap.com/file/pi0zH97fmNpEOlRoHm16KJuRCzWvX6

6. Duplicate exclude entry
https://monosnap.com/file/MNBS3UckD10PDno8j1l7sVP0LuSFCT