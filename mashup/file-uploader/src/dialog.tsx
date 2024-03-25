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
import { Slider } from '@utopia/radix-slider'
import { cn } from '@utopia/classnames'
import Cropper from 'react-easy-crop'
import type { CustomDropzoneState } from './use-file-uploader'

interface DialogProps
  extends Pick<
    CustomDropzoneState,
    | 'dialogImage'
    | 'isCropping'
    | 'crop'
    | 'rotation'
    | 'zoom'
    | 'setCrop'
    | 'setRotation'
    | 'setZoom'
    | 'onCropComplete'
    | 'mergeCroppedImage'
  > {
  onOpenChange?: (open: boolean) => void
  open?: boolean | undefined
}

function Dialog({
  onOpenChange,
  open,
  dialogImage,
  isCropping,
  crop,
  rotation,
  zoom,
  setCrop,
  setRotation,
  setZoom,
  onCropComplete,
  mergeCroppedImage
}: DialogProps): JSX.Element {
  return (
    <DialogPrimitive onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isCropping ? 'Image Cropper' : 'Image Preview'}
          </DialogTitle>
          <DialogDescription>
            File name: {dialogImage?.file.name}
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            'flex items-center justify-center',
            isCropping ? 'relative h-96 w-full' : 'space-x-2'
          )}
        >
          {isCropping ? (
            <Cropper
              aspect={4 / 3}
              crop={crop}
              image={dialogImage?.preview}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onRotationChange={setRotation}
              onZoomChange={setZoom}
              rotation={rotation}
              zoom={zoom}
              zoomSpeed={0.5}
            />
          ) : (
            <img alt={dialogImage?.file.name} src={dialogImage?.preview} />
          )}
        </div>
        <DialogFooter className="justify-between">
          {isCropping ? (
            <div className="flex flex-1 justify-between gap-x-2">
              <div className="flex-1">
                <p className="text-xs">Zoom</p>
                <Slider
                  className="w-full"
                  max={3}
                  min={1}
                  onValueChange={(value: number[]) => {
                    setZoom(value[0])
                  }}
                  step={0.01}
                  value={[zoom]}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs">Rotation</p>
                <Slider
                  className="w-full"
                  max={360}
                  min={0}
                  onValueChange={(value: number[]) => {
                    setRotation(value[0])
                  }}
                  step={1}
                  value={[rotation]}
                />
              </div>
            </div>
          ) : null}
          <div className="flex items-center sm:space-x-2">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            {isCropping ? (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises -- TEMP
              <Button onClick={mergeCroppedImage}>Crop</Button>
            ) : null}
          </div>
        </DialogFooter>
      </DialogContent>
    </DialogPrimitive>
  )
}

export default Dialog
