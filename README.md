# @amazing-kit/docker

Run docker commands from nodejs
- run
- stop
- ps

## Install

```sh
pnpm add @amazing-kit/docker
```

```ts
// ESModule only
import docker from "@amazing-kit/docker"
```

## Get docker containers

```ts
const all_containers = await docker.ps({ all: true })
// get container data in JSON format
```

## Run a new docker container

```ts
await docker.run("image_name", {
  // all options are optional
  name: "container_name",
  ports: [
    { host: 8080, container: 80 }
  ],
  env: [
    { name: "ENV_NAME", value: "ENV_VALUE"}
  ],
  volumes: [
    { source: "/host/path", container: "/container/path", readonly: true }
  ],
  auto_remove: true, // default false
  daemon: true,      // default false
})
```

## Stop a docker container

```ts
await docker.stop("container_name", { forceKillAfter: 1000 })
```

## Alternatives

- [dockerode](https://github.com/apocas/dockerode)
- [docker-js](https://github.com/giper45/docker-js)
- [zx](https://github.com/google/zx) -> not docker specific (execu docker CLI in JS)