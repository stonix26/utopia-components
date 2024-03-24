import {
  Dialog as DialogPrimitive,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@utopia/radix-dialog'
import { Button } from '@utopia/radix-button'
import type { CustomFile } from './use-file-uploader'

interface DialogProps {
  fileImage: CustomFile | null
  onOpenChange?: (open: boolean) => void
  open?: boolean | undefined
}

function Dialog({ onOpenChange, open, fileImage }: DialogProps): JSX.Element {
  return (
    <DialogPrimitive onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>
            File name: {fileImage?.file.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div>
            {fileImage ? <img alt="Hello" src={fileImage.preview} /> : null}
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button size="xs" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPrimitive>
  )
}

export default Dialog
