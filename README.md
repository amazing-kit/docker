# docker

Run docker commands from nodejs
- run
- stop
- ps

```ts
// ESModule only
import docker from "@amazing-kit/docker"

const all_containers = await docker.ps({ all: true })
// get container data in JSON format

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

await docker.stop("container_name", { forceKillAfter: 1000 })
```