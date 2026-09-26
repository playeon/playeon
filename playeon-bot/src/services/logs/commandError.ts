import { md } from '@mtcute/markdown-parser'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'

function describe(err: unknown): string {
  if (err instanceof Error) return err.stack ?? err.message
  return String(err)
}

/**
 * Posted to the `error` log feed whenever a command handler or a
 * process-level hook (`chatId: 0` - no chat to attribute it to) throws.
 * Never throws itself - this runs from inside `catch` blocks and crash
 * handlers, so a failure here must not mask or replace the original error.
 */
export async function logCommandError(name: string, err: unknown, chatId: number): Promise<void> {
  const logChatId = await getLogChatId('error')
  if (!logChatId) return

  const where = chatId ? md` in \`${String(chatId)}\`` : md``
  const detail = describe(err).slice(0, 3500)

  await tg
    .sendText(logChatId, md`**${name}**${where}\n\`\`\`\n${detail}\n\`\`\``, { disableWebPreview: true })
    .catch(() => {})
}
