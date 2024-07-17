# Start Self-hosted Runner

This GitHub Action configures and starts a self-hosted runner on a virtual machine.

## Description

The action automates the process of setting up a self-hosted runner by performing the following steps:
1. Configuring an SSH connection to the virtual machine.
2. Downloading the self-hosted runner package.
3. Configuring the self-hosted runner.

## Inputs

| Name             | Required | Type   | Description                                                                 |
|------------------|----------|--------|-----------------------------------------------------------------------------|
| `linuxUser`      | true     | string | User used to access the virtual machine                                     |
| `linuxUserPass`  | true     | string | Password of the user used to access the virtual machine                     |
| `linuxIP`        | true     | string | IP of the virtual machine                                                   |
| `unattended`     | false    | string | Disable interactive prompts for missing arguments. Defaults will be used for missing options |
| `url`            | true     | string | Repository to add the runner to. Required if unattended                     |
| `token`          | true     | string | Registration token. Required if unattended                                  |
| `name`           | false    | string | Name of the runner to configure (default: `<vm_name>`)                      |
| `runnergroup`    | false    | string | Name of the runner group to add this runner to (default: default)           |
| `labels`         | false    | string | Custom labels that will be added to the runner. This option is mandatory if `--no-default-labels` is used. |
| `noDefaultLabels`| false    | string | Disables adding the default labels: 'self-hosted,Linux,X64'                 |
| `local`          | false    | string | Removes the runner config files from your local machine. Used as an option to the remove command |
| `work`           | false    | string | Relative runner work directory (default: _work)                             |
| `replace`        | false    | string | Replace any existing runner with the same name (default: false)             |
| `pat`            | false    | string | GitHub personal access token with repo scope. Used for checking network connectivity when executing `./run.sh --check` |
| `disableupdate`  | false    | string | Disable self-hosted runner automatic update to the latest released version  |
| `ephemeral`      | false    | string | Configure the runner to only take one job and then let the service un-configure the runner after the job finishes (default: false) |

## Usage

Here are examples of workflows that use this composite action.

### Example 1: Basic Usage

```yaml
name: Start Self-hosted Runner (Unattended)
on:
  workflow_dispatch:
    inputs:
      LINUX_IP:
        required: true
        type: string
        description: "IP: IP of the virtual machine"
      RUNNER_TOKEN:
        required: true
        type: string
        description: "RUNNER TOKEN: Registration token. Required if unattended"
jobs:
  start-runner:
    runs-on: ubuntu-latest
    steps:
      - name: Start Self-hosted Runner
        uses: stemdo-labs/actions/start_linux_selfhosted_runner@main
        with:
          linuxUser: "${{ secrets.VM_USER }}"
          linuxUserPass: "${{ secrets.VM_PASS }}"
          linuxIP: "${{ github.event.inputs.LINUX_IP }}"
          unattended: "yes"
          url: "https://github.com/${{ github.repository }}"
          token: "${{ github.event.inputs.RUNNER_TOKEN }}"
          replace: "yes"
```
This action does not allow the self-hosted runner to connect via SSH to other terminals. This option will be added in the next version.