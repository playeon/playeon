import { md } from '@mtcute/markdown-parser'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'

type Sender = {
  id: number
  displayName: string
}

/** Posted to the `core` log feed whenever a group's command prefix changes. */
export async function logPrefixChanged(
  chatId: number,
  sender: Sender,
  oldPrefix: string,
  newPrefix: string,
): Promise<void> {
  const logChatId = await getLogChatId('core')
  if (!logChatId) return

  const mention = md`[${sender.displayName}](tg://user?id=${sender.id})`

  await tg
    .sendText(
      logChatId,
      md`⚙️ Prefix changed in \`${String(chatId)}\` by ${mention}: \`${oldPrefix}\` → \`${newPrefix}\``,
      { disableWebPreview: true },
    )
    .catch(() => {})
}
