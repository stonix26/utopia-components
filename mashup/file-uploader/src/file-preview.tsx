/* eslint-disable no-nested-ternary -- Ok */
import type { MouseEventHandler, HTMLAttributes } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@utopia/radix-dropdown-menu'
import {
  CircleEllipsis,
  Clapperboard,
  File,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@utopia/classnames'
import type { CustomFile } from './use-file-uploader'

interface FilePreviewProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<CustomFile, 'id'> {
  onPreviewClick?: MouseEventHandler<HTMLButtonElement> | undefined
  options: {
    id: string | number
    name: string
    icon: LucideIcon
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
  }[]
}

function FilePreview({
  file,
  preview,
  onPreviewClick,
  options,
  className,
  ...props
}: FilePreviewProps): JSX.Element {
  const box = file.type.startsWith('image/') ? (
    <button
      className="h-32 w-32 overflow-hidden rounded border border-border"
      onClick={onPreviewClick}
      type="button"
    >
      <img
        alt={file.name}
        className="h-full w-full cursor-pointer object-cover"
        src={preview}
      />
    </button>
  ) : file.type.startsWith('video/') ? (
    <div className="flex h-32 w-32 items-center justify-center rounded border border-border transition-colors group-hover:bg-foreground/50">
      <Clapperboard className="text-primary-50 h-10 w-10 text-border" />
    </div>
  ) : (
    <div className="flex h-32 w-32 items-center justify-center rounded border border-border transition-colors group-hover:bg-foreground/50">
      <File className="text-primary-50 h-10 w-10 text-border" />
    </div>
  )

  return (
    <div className={cn('group relative h-32 w-32', className)} {...props}>
      {box}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="absolute right-0 top-0 p-1.5 opacity-50"
            type="button"
          >
            <CircleEllipsis className="h-4 w-4 text-white" />
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
