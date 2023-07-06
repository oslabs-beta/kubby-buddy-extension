## Table of Contents

- [About](#about)
- [Demo](#demo)
- [Setup](#setup)
- [File Structure](#file-structure)
- [Contributing](#contibuting)
- [Dev Setup](#local-development-setup)
- [Progress](#progress)
- [Meet the Team](#meet-the-team)
- [License](#license)

<p align="center">
  <img src="./assets/logo.png">
</p>

## ABOUT

**Kubby Buddy** is your container manegment buddy, giving you an easy to use GUI for all your Docker needs. All you need to do is launch our application, and your local images will load into our app, from there you can easily view, launch, stop and even delete your containers and images straight from our app. We also include metrics and even averages of your CPU and memory usgage utilizing a containerized database running on your local machine.

<div align="center">
  <img src="https://img.shields.io/badge/circleci-343434?style=for-the-badge&logo=circleci&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white"/>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</div>

## Demo

Here we can see creating a container from an image.
<img src="./assets/Main_App_Images.gif"/>

Here we can see our running containers, starting and stopping those containers as well as the logs for those containers.
<img src="./assets/Main_App_Containers.gif"/>

Here we create a new volume, then delete it.
<img src="./assets/Main_App_Volumes.gif"/>

## SETUP

Follow these steps for easy setup.

And you're done, enjoy the simplicity of using your new container management buddy.

## File Structure

```
.
├── Dockerfile
├── LICENSE
├── Makefile
├── README.md
├── assets
├── backend
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── docker-compose.yaml
├── docker.svg
├── metadata.json
└── ui
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── src
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Contibuting

Contributing is what makes the open source community great. If you want to contribute to this project, you can follow these guidelines.

- Fork and clone the repository.
- Branch off the dev branch, with a branch name starting in feat, fix, bug, docs, test, wip or merge, then adding a new folder named whatever it is you are adding. (ex. feat/database)
- When you commit, be sure to follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) standards.
- Once your new feture is built out, you can submit a pull request to dev.

## Local Development Setup

You can use `docker` to build, install and push your extension. Also, we provide an opinionated [Makefile](Makefile) that could be convenient for you. There isn't a strong preference of using one over the other, so just use the one you're most comfortable with.

To build the extension, use `make build-extension` **or**:

```shell
  docker buildx build -t kubbybuddy/kubby-buddy-extension:latest . --load
```

To install the extension, use `make install-extension` **or**:

```shell
  docker extension install kubbybuddy/kubby-buddy-extension:latest
```

> If you want to automate this command, use the `-f` or `--force` flag to accept the warning message.

To preview the extension in Docker Desktop, open Docker Dashboard once the installation is complete. The left-hand menu displays a new tab with the name of your extension. You can also use `docker extension ls` to see that the extension has been installed successfully.

### Frontend Development Setup

During the development of the frontend part, it's helpful to use hot reloading to test your changes without rebuilding your entire extension. To do this, you can configure Docker Desktop to load your UI from a development server.
Assuming your app runs on the default port, start your UI app and then run:

```shell
  cd ui
  npm install
  npm run dev
```

This starts a development server that listens on port `3000`.

You can now tell Docker Desktop to use this as the frontend source. In another terminal run:

```shell
  docker extension dev ui-source kubbybuddy/kubby-buddy-extension:latest http://localhost:3000
```

In order to open the Chrome Dev Tools for your extension when you click on the extension tab, run:

```shell
  docker extension dev debug kubbybuddy/kubby-buddy-extension:latest
```

Each subsequent click on the extension tab will also open Chrome Dev Tools. To stop this behaviour, run:

```shell
  docker extension dev reset kubbybuddy/kubby-buddy-extension:latest
```

### Backend development (optional)

This example defines an API in Go that is deployed as a backend container when the extension is installed. This backend could be implemented in any language, as it runs inside a container. The extension frameworks provides connectivity from the extension UI to a socket that the backend has to connect to on the server side.

Note that an extension doesn't necessarily need a backend container, but in this example we include one for teaching purposes.

Whenever you make changes in the [backend](./backend) source code, you will need to compile them and re-deploy a new version of your backend container.
Use the `docker extension update` command to remove and re-install the extension automatically:

```shell
docker extension update kubbybuddy/kubby-buddy-extension:latest
```

> If you want to automate this command, use the `-f` or `--force` flag to accept the warning message.

> Extension containers are hidden from the Docker Dashboard by default. You can change this in Settings > Extensions > Show Docker Extensions system containers.

### Clean up

To remove the extension:

```shell
docker extension rm kubbybuddy/kubby-buddy-extension:latest
```

## Progress

| Feature                                                | Status                                                |
| ------------------------------------------------------ | ----------------------------------------------------- |
| Image page                                             | <img src="./assets/bear-party.webp" width="20"/>  |
| Container page                                         | <img src="./assets/bear-party.webp" width="20"/>  |
| Add containerized database                             | <img src="./assets/bear-bongo.webp" width="20"/>  |
| Impliment Grafana                                      | <img src="./assets/bear-bongo.webp" width="20"/>  |
| Bring extention to feature parody                      | <img src="./assets/bear-bongo.webp" width="20"/>  |
| Volume page                                            | <img src="./assets/bear-snooze.webp" width="20"/> |
| Add alerts for when buttons fail to load               | <img src="./assets/bear-snooze.webp" width="20"/> |
| Fix container not loading when started outside the app | <img src="./assets/bear-snooze.webp" width="20"/> |
| Add more diverse and costomizable commands             | <img src="./assets/bear-snooze.webp" width="20"/> |

- <img src="./assets/bear-party.webp" width="20"/> = Finished feature
- <img src="./assets/bear-bongo.webp" width="20"/> = Work in progress feature
- <img src="./assets/bear-snooze.webp" width="20"/> = Not yet started feature

## Meet the Team!

<table align="center">
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/123416896?v=4" width="100"/>
      <br />
      <sub><b>Chang Moon</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/126903033?v=4" width="100"/>
      <br />
      <sub><b>Josh Goo</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/108921232?v=4" width="100"/>
      <br />
      <sub><b>Steve Lemlek</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/22490059?v=4" width="100"/>
      <br />
      <sub><b>Trey Walker</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/github-favicon.png" width="20"/></a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/127268892?v=4" width="100"/>
      <br />
      <sub><b>William Reilly</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/linkedin-favicon.png" width="20"/></a>
      <a href="https://www.linkedin.com/in/kasualkid12/"><img src="./assets/github-favicon.png" width="20"/></a>
    </td>
  </tr>
</table>

## License

This project is licensed under the terms of the [MIT LICENSE](./LICENSE).