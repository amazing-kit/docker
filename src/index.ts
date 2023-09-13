import {$} from "zx"

$.verbose = false

import { get_all_containers } from "./commands/get_all_containers"
import { run_container } from "./commands/run_container"
import { stop_container } from "./commands/stop_container"

export type { DockerContainer, GetDockerContainerConfig } from "./commands/get_all_containers"
export type { RunContainerConfig, ContainerEnvironmentVariable, ContainerPort, ContainerVolume } from "./commands/run_container"
export type { StopContainerConfig } from "./commands/stop_container"

const docker = {
  run: run_container,
  stop: stop_container,
  ps: get_all_containers
}

export type Docker = typeof docker

export default docker