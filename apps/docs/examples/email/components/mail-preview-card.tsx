import React, { ComponentProps } from 'react'
import { Badge } from '@utopia/radix-badge'
import type { InboxPreviewInterface } from '../types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function MailPreviewCard(props: InboxPreviewInterface): JSX.Element {
  return (
    <button
      className="flex w-full flex-col gap-y-2 rounded-md border border-border p-4 hover:bg-accent"
      onClick={props.onClick}
      type="button"
    >
      <div className="flex w-full items-center justify-between">
        <p className="inline-flex items-center font-semibold">
          {props.sender}{' '}
          {props.read ? null : (
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
          )}
        </p>
        <p className="text-xs text-foreground">
          {formatDistanceToNow(new Date(props.date_sent), { addSuffix: true })}
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
            key={tag}
            variant={getBadgeVariantFromTags(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  )
}

export default MailPreviewCard

function getBadgeVariantFromTags(
  tag: string
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(tag.toLocaleLowerCase())) {
    return 'default'
  }

  if (['personal'].includes(tag.toLocaleLowerCase())) {
    return 'outline'
  }

  return 'secondary'
}
