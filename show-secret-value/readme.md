Para utilizar esta custom action, tienes que introducir un secreto previamente que es solicitado cuando lo vayas a ejecutar 
El workflow desde donde se lanza es similar a este:


```
name: Use Secret Action

on:
  workflow_dispatch:
    inputs:
      secretName:
        description: 'Name of the secret to show'
        required: true

jobs:
  show-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Use Custom Action to Show Secret
        uses: stemdo-labs/actions/show-secret-value@main
        with:
          secret_value: ${{ secrets[github.event.inputs.secretName] }}
```
