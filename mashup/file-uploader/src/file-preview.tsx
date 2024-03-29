/* eslint-disable no-nested-ternary -- its ok */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@utopia/radix-dropdown-menu'
import { cn } from '@utopia/classnames'
import { File, Film, CircleEllipsis } from 'lucide-react'
import type { FilePreviewProps } from './types'

function FilePreview({
  file,
  preview,
  onPreviewClick,
  options,
  className,
  disabled,
  ...props
}: FilePreviewProps): JSX.Element {
  const fileName = file.name ? (
    <p className="truncate text-center text-xs">{file.name}</p>
  ) : null

  const box = file.type.startsWith('image/') ? (
    <div className="flex flex-col justify-center gap-y-1.5">
      <button
        className="h-32 w-32 overflow-hidden rounded border"
        disabled={disabled}
        onClick={onPreviewClick}
        type="button"
      >
        <img
          alt={file.name}
          className="h-full w-full cursor-pointer object-cover"
          src={preview}
        />
      </button>
      {fileName}
    </div>
  ) : file.type.startsWith('video/') ? (
    <div className="flex flex-col justify-center gap-y-1.5 overflow-hidden">
      <button
        className="flex h-32 w-32 items-center justify-center rounded border border-border opacity-50 transition-colors group-hover:bg-secondary"
        onClick={() => {
          window.open(preview, '_blank')
        }}
        type="button"
      >
        <Film className="h-10 w-10 text-secondary-foreground" />
      </button>
      {fileName}
    </div>
  ) : (
    <div className="flex flex-col justify-center gap-y-1.5 overflow-hidden">
      <button
        className="flex h-32 w-32 items-center justify-center rounded border border-border opacity-50 transition-colors group-hover:bg-secondary"
        onClick={() => {
          window.open(preview, '_blank')
        }}
        type="button"
      >
        <File className="h-10 w-10 text-secondary-foreground" />
      </button>
      {fileName}
    </div>
  )

  return (
    <div className={cn('group relative h-36 w-32', className)} {...props}>
      {box}

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            className="absolute right-0 top-0 rounded bg-white p-1.5 opacity-50"
            type="button"
          >
            <CircleEllipsis className="h-4 w-4 text-primary" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map(option => {
            const Icon = option.icon
            return (
              <DropdownMenuItem key={option.id} onClick={option.onClick}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{option.name}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default FilePreview
