import { Badge } from '@utopia/badge'
import type { InboxPreviewInterface } from '../types'
import { formatDateToRelative } from '../../../utils/dates'

function MailPreviewCard(props: InboxPreviewInterface): React.JSX.Element {
  return (
    <button
      className="flex w-full flex-col gap-y-2 rounded-md border border-border p-4 hover:bg-accent"
      type="button"
      onClick={props.onClick}
    >
      <div className="flex w-full items-center justify-between">
        <p className="inline-flex items-center font-semibold">
          {props.sender}{' '}
          {props.read ? null : (
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
          )}
        </p>
        <p className="text-xs text-foreground">
          {formatDateToRelative(props.date_sent)}
        </p>
      </div>
      <p className="text-xs font-medium">{props.title}</p>
      <div
        className="line-clamp-2 text-left text-xs text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
      <div className="flex gap-2">
        {props.tags.map(tag => (
          <Badge
            className="rounded-md"
            key={tag.name}
            variant={tag.variant ?? 'default'}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </button>
  )
}

export default MailPreviewCard
