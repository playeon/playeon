import { md } from '@mtcute/markdown-parser'
import type { Chat, User } from '@mtcute/node'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'

/** Posted to the `core` log feed whenever the bot is added to a new group. */
export async function logBotJoinedChat(chat: Chat, actor: User | undefined, memberCount: number | null): Promise<void> {
  const chatId = await getLogChatId('core')
  if (!chatId) return

  const by = actor
    ? md`[${actor.displayName}](tg://user?id=${actor.id}) \`${String(actor.id)}\``
    : md`Unknown`
  const count = memberCount != null ? String(memberCount) : 'Unknown'

  await tg
    .sendText(
      chatId,
      md`**Added to Chat**\n**Chat:** ${chat.title ?? 'a group'} \`${String(chat.id)}\`\n**Members:** ${count}\n**By:** ${by}`,
      { disableWebPreview: true },
    )
    .catch(() => {})
}
