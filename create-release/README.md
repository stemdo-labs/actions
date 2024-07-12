# Create release

Create a new release branch in a repository. The action is triggered manually using the workflow_dispatch event, which asks the user to input a release version. The main task of this action is to create and push a new branch named "release-[release version]" to the repository.