const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');

try {
  const releaseType = core.getInput('release_type');
  
  // Fetch tags from the repository
  execSync('git fetch --tags');
  
  // Get the latest tag
  const latestTag = execSync('git describe --tags `git rev-list --tags --max-count=1`').toString().trim();
  console.log(`Latest tag: ${latestTag}`);
  
  // Parse the version number
  const versionParts = latestTag.replace('v', '').split('.');
  let major = parseInt(versionParts[0]);
  let minor = parseInt(versionParts[1]);
  let patch = parseInt(versionParts[2]);

  // Increment the version based on release type
  if (releaseType === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (releaseType === 'minor') {
    minor += 1;
    patch = 0;
  } else if (releaseType === 'patch') {
    patch += 1;
  } else {
    throw new Error('Invalid release type');
  }

  const newVersion = `v${major}.${minor}.${patch}`;
  console.log(`New version: ${newVersion}`);
  
  // Create a new tag
  execSync(`git tag ${newVersion}`);
  execSync(`git push origin ${newVersion}`);

  core.setOutput('new_version', newVersion);
} catch (error) {
  core.setFailed(error.message);
}
