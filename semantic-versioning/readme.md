Para el funcionamiento de la action, este sería el formato de workflow que puede actuar sobre ella:

Desde el workflow se le pasan 3 inputs :    
    - la ruta del archivo que contiene la version
    - la palabra clave (que normalmente es version)
    - el tipo de actualizacion (major, minor o patch)


```

name:  Update Version (semantic versioning)

on:
  workflow_dispatch:
    inputs:
      file:
        description: 'Path to the file containing the version'
        required: true
        default: 'package.json'
      version-key:
        description: 'The key to find the version in the file'
        required: true
        default: 'version'
      bump-type:
        description: 'Type of version bump: major, minor, or patch'
        required: true
        default: 'patch'

jobs:
  update-version:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Update version
        uses: stemdo-labs/actions/semantic-versioning@main
        with:
          file: ${{ github.event.inputs.file }}
          version-key: ${{ github.event.inputs.version-key }}
          bump-type: ${{ github.event.inputs.bump-type }}
```

este es un workflow de prueba, aunque se podria hacer automaticamente con otra alternativa de flujo de trabajo
