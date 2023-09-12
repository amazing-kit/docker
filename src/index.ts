import {$} from "zx"

$.verbose = false

import { get_all_containers } from "./commands/get_all_containers"
import { run_container } from "./commands/run_container"
import { stop_container } from "./commands/stop_container"

const docker = {
  run_container,
  stop_container,
  get_all_containers
}

export default docker