# docker

```ts
import docker from "@amazing-kit/docker"

const all_containers = await docker.ps({ all: true })

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

// TODO: in a next version
const all_images = await docker.all_images()
const all_networks = await docker.all_networks()
const all_volumes = await docker.all_volumes()

const container = await docker.container("container_name")
const image = await docker.image("image_name")
const network = await docker.network("network_name")
const volume = await docker.volume("volume_name")


await docker.remove_container("container_name")
```