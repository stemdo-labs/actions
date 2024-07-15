# Create release

Create a new release branch in a repository. The action is triggered manually using the workflow_dispatch event, which asks the user to input a release version. The main task of this action is to create and push a new branch named "release-[release version]" to the repository.

## Example of usage

```
name: "Create Release Branch"

on:
  workflow_dispatch:
    inputs:
      release_version:
        description: 'Release version (e.g., 1.0.0)'
        required: true
        default: ''
permissions:
      id-token: write
      contents: write

jobs:
  create-branch:
    runs-on: ubuntu-latest
    steps:
      - name: Create Release Branch
        uses: stemdo-labs/actions/create-release@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          release_version: ${{ github.event.inputs.release_version }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
