import {$} from "zx"

export type StopContainerConfig = {
  forceKillAfter?: number // milliseconds
}

export const stop_container = (container_id_or_name: string, config?: StopContainerConfig) => {
  const args = []

  if (config?.forceKillAfter) {
    args.push('--time')
    args.push(config.forceKillAfter)
  }

  return (
    $`docker stop ${args} ${container_id_or_name}`
      .then(output => {})
      .catch(console.error)
  )
} 


