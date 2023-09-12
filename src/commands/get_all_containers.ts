import {$} from "zx"

export type DockerContainer = {
  ID: string
  Names: string
  Labels: string
  Image: string
  Command: string
  LocalVolumes: string
  Mounts: string
  Networks: string
  Ports: string
  Status: string
  State: string
  RunningFor: string
  Size: string
  CreatedAt: string
}

export type GetDockerContainerConfig = {
  all?: boolean
}

export const get_all_containers = (config?: GetDockerContainerConfig): Promise<DockerContainer[]> => {
  const all = config?.all ?? false ? '-a' : ''

  return (
    $`docker ps ${all} --no-trunc --format=json`
      .then(output => (
        JSON.parse(`[${
          String(output)
            .split("\n")
            .filter(line => line !== "")
        }]`) as DockerContainer[]
      ))
  )
}
