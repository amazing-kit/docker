import {$} from "zx"

export type RunContainerConfig = {
  name?: string
  env?: ContainerEnvironmentVariable[]
  ports?: ContainerPort[]
  volumes?: ContainerVolume[]
  auto_remove?: boolean
  deamon?: boolean
}

export type ContainerEnvironmentVariable = {
  name: string
  value: string
}

export type ContainerPort = {
  host: number
  container: number
}

export type ContainerVolume = {
  source: string
  container: string
  readonly?: boolean
}

export const run_container = (image: string, config?: RunContainerConfig) => {
  const args = []

  if (config?.name) {
    args.push('--name')
    args.push(config.name)
  }

  if (config?.env) {
    config.env.forEach(({ name, value }) => {
      args.push(`-e`)
      args.push(`${name}=${value}`)
    })
  }

  if (config?.ports) {
    config.ports.forEach(({ host, container }) => {
      args.push(`-p`)
      args.push(`${host}:${container}`)
    })
  }

  if (config?.volumes) {
    config.volumes.forEach(({ source, container, readonly }) => {
      args.push(`-v`)
      args.push(`${source}:${container}${readonly ? ":ro" : ""}`)
    })
  }

  if (config?.auto_remove ?? false) {
    args.push('--rm')
  }

  if (config?.deamon ?? false) {
    args.push('-d')
  }

  return (
    $`docker run ${args} ${image}`
      .then(output => {})
      .catch(console.error)
  )
}


