import { md } from '@mtcute/markdown-parser'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'

type Actor = { id: number; displayName: string }

/** Posted to the `core` log feed whenever a superuser is removed. */
export async function logSuperuserRemoved(actor: Actor, target: Actor): Promise<void> {
  const chatId = await getLogChatId('core')
  if (!chatId) return

  const by = md`[${actor.displayName}](tg://user?id=${actor.id})`
  const who = md`[${target.displayName}](tg://user?id=${target.id})`

  await tg
    .sendText(chatId, md`➖ ${who} removed as superuser by ${by}`, { disableWebPreview: true })
    .catch(() => {})
}
