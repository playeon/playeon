import { md } from '@mtcute/markdown-parser'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'

type StartedUser = {
  id: number
  displayName: string
  username?: string | null
}

/** Posted to the `core` log feed the first time someone starts the bot in DM. */
export async function logUserStarted(user: StartedUser): Promise<void> {
  const chatId = await getLogChatId('core')
  if (!chatId) return

  const mention = md`[${user.displayName}](tg://user?id=${user.id}) \`${String(user.id)}\``
  const handle = user.username ? `@${user.username}` : 'None'

  await tg
    .sendText(chatId, md`👤 **New User**\n**User:** ${mention}\n**Username:** ${handle}`, { disableWebPreview: true })
    .catch(() => {})
}
