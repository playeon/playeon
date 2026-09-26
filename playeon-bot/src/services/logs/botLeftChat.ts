import { md } from '@mtcute/markdown-parser'
import type { Chat } from '@mtcute/node'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'

/** Posted to the `core` log feed whenever the bot is removed from a group. */
export async function logBotLeftChat(chat: Chat): Promise<void> {
  const chatId = await getLogChatId('core')
  if (!chatId) return

  await tg
    .sendText(chatId, md`➖ Removed from **${chat.title ?? 'a group'}** (\`${String(chat.id)}\`)`, {
      disableWebPreview: true,
    })
    .catch(() => {})
}
