import { md } from '@mtcute/markdown-parser'
import { tg } from '../../client.js'
import { getLogChatId } from '../logChats.js'
import { formatDuration } from '../../lib/format.js'

type PlayedTrack = {
  track: string
  room: string
  video: boolean
  playedBy: string
  duration: number | null
}

/** Posted to the `plays` log feed whenever a room starts a new track. */
export async function logTrackPlayed(info: PlayedTrack): Promise<void> {
  const chatId = await getLogChatId('plays')
  if (!chatId) return

  const kind = info.video ? '🎬' : '🎵'
  const type = info.video ? 'video' : 'audio'
  const duration = info.duration != null && info.duration > 0 ? formatDuration(info.duration) : 'live'

  await tg
    .sendText(
      chatId,
      md`${kind} **Track Played**\n**Track:** ${info.track}\n**Room:** ${info.room}\n**Type:** ${type}\n**Played by:** ${info.playedBy}\n**Duration:** ${duration}`,
      { disableWebPreview: true },
    )
    .catch(() => {})
}
