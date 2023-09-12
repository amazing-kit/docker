import {describe, beforeEach, beforeAll, afterEach, afterAll, expect, test} from 'vitest';
import {$} from "zx"

import { get_all_containers } from "../get_all_containers"
import { run_container } from "../run_container"
import { stop_container } from "../stop_container"

$.verbose = true

describe("all_containers", () => {
  beforeAll(async () => {
    await stop_container("test-postgres", { forceKillAfter: 1 }).catch(() => {})
  })

  test.skip("get containers", async () => {
    const all_container = await get_all_containers()

    expect(all_container).toBeDefined()
    expect(Array.isArray(all_container)).toBeTruthy()
  })

  test("create a container and see it", async () => {
    await run_container("postgres", {
      name: "test-postgres",
      auto_remove: true,
      deamon: true,
      env: [
        { name: "POSTGRES_PASSWORD", value: "postgres" },
      ],
      ports: [
        { host: 10000, container: 5432 },
      ],
      volumes: [
        { source: "/tmp/postgres", container: "/var/lib/postgresql/data" },
      ]
    })

    await wait(3000)
    console.log('------------------------------------------------------')
    console.log('------------------------------------------------------')

    const all_container = await get_all_containers({ all: true })
    console.log(`- all_container`, all_container)

    expect(all_container).toContainEqual({
      ID: expect.any(String),
      Names: expect.any(String),
      Labels: expect.any(String),
      Image: expect.any(String),
      Command: expect.any(String),
      LocalVolumes: expect.any(String),
      Mounts: expect.any(String),
      Networks: expect.any(String),
      Ports: expect.any(String),
      Status: expect.any(String),
      State: expect.any(String),
      RunningFor: expect.any(String),
      Size: expect.any(String),
      CreatedAt: expect.any(String),
    })

    expect(all_container).toContainEqual({
      Names: 'test-postgres',
      Image: 'postgres',
      Ports: '0.0.0.0:10000->5432/tcp',
      State: 'running',

      ID: expect.any(String),
      Labels: expect.any(String),
      Command: expect.any(String),
      LocalVolumes: expect.any(String),
      Mounts: expect.any(String),
      Networks: expect.any(String),
      Status: expect.any(String),
      RunningFor: expect.any(String),
      Size: expect.any(String),
      CreatedAt: expect.any(String),
    })

    await stop_container("test-postgres", { forceKillAfter: 1000 })
  })
})


const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
