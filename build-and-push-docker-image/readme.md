Para el funcionamiento de la action, este sería el formato de workflow que puede actuar sobre ella:

```
name: Build and Push Docker Image

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    outputs:
      image_name: ${{ steps.docker_build.outputs.image_name }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Build and push Docker image
        id: docker_build
        uses: stemdo-labs/actions/build-and-push-docker-image@main
        with:
          registry_url: 'docker.io'
          repository: 'ploopez/prueba'
          tag: 'latest'
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          context: '.'

      - name: Print Image input (extract version)
        run: echo "La version que se va a taggear es ${{ steps.docker_build.outputs.image_name }}"
```

Donde 
  -  registry_url: es el parámetro que especifica la URL del registro de Docker donde se almacenará la imagen.
  -  repository : El nombre del repositorio en Docker Hub donde se almacenará la imagen.
  -  tag:  La etiqueta de la imagen
  -  username: el nombre del usuario de DockerHub, en este caso se le pasa como secreto de Github
  -  password: la contraseña del usuario de DockerHub, en este caso se le pasa como secreto de Github   
  -  context: la ruta del repositorio donde se encuentra el Dockerfile, en este caso, el Dockerfile se encuentra en la raíz del repo
