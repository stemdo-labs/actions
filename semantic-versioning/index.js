const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

// Helper function to increment version
function incrementVersion(version, bumpType) {
  const [major, minor, patch] = version.split('.').map(Number);
  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Invalid bump type: ${bumpType}`);
  }
}

async function run() {
  try {
    const filePath = core.getInput('file');
    const versionKey = core.getInput('version-key');
    const bumpType = core.getInput('bump-type');
    
    const absolutePath = path.resolve(filePath);
    const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    
    // Find the version in the file
    if (!(versionKey in data)) {
      throw new Error(`Version key ${versionKey} not found in file`);
    }

    const oldVersion = data[versionKey];
    const newVersion = incrementVersion(oldVersion, bumpType);
    
    // Update the version
    data[versionKey] = newVersion;
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`Version updated from ${oldVersion} to ${newVersion}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
