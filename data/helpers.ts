import type { MeiliSearch } from 'meilisearch'

export async function watchTasks (client: MeiliSearch, uid: string) {
  console.log(`Start update watch for ${uid}`)
  try {
    const tasks = await client.index(uid).getTasks()
    console.log(`${uid} index: waiting for tasks`)
    await client.index(uid).waitForTasks(tasks)
    console.log(`${uid} index: tasks finished`)
  } catch (e) {
    console.error(e)
  }
}
