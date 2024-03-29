import { useEffect, useState } from 'react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogPrimitive,
  DialogTitle
} from '@utopia/radix-dialog'
import { Button } from '@utopia/radix-button'
import { Slider } from '@utopia/radix-slider'
import { Label } from '@utopia/radix-label'
import { cn } from '@utopia/classnames'
import { FlipHorizontal, FlipVertical } from 'lucide-react'
import Cropper from 'react-easy-crop'
import type { DialogProps } from './types'

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
  const [rotateX, setRotateX] = useState<90 | 270>(90)
  const [rotateY, setRotateY] = useState<0 | 180>(0)

  useEffect(() => {
    setRotation(rotateX)
  }, [rotateX, setRotation])

  useEffect(() => {
    setRotation(rotateY)
  }, [rotateY, setRotation])

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
        <DialogFooter className="justify-between gap-x-4">
          {isCropping ? (
            <div className="flex flex-1 items-start justify-between gap-x-4">
              <div className="flex flex-1 justify-between gap-x-4">
                <div className="flex flex-1 flex-col justify-between gap-y-2.5">
                  <Label className="text-xs" htmlFor="zoom">
                    Zoom
                  </Label>
                  <Slider
                    className="w-full"
                    id="zoom"
                    max={3}
                    min={1}
                    onValueChange={(value: number[]) => {
                      setZoom(value[0])
                    }}
                    step={0.01}
                    value={[zoom]}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-y-2.5">
                  <Label className="text-xs" htmlFor="rotation">
                    Rotation
                  </Label>
                  <Slider
                    className="w-full"
                    id="rotation"
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
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    setRotateX(rotateX === 90 ? 270 : 90)
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <FlipHorizontal className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    setRotateY(rotateY === 0 ? 180 : 0)
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <FlipVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}
          <div className="flex items-center sm:space-x-2">
            <DialogClose asChild>
              <Button size="sm" variant="outline">
                Close
              </Button>
            </DialogClose>
            {isCropping ? (
              <Button onClick={() => void mergeCroppedImage()} size="sm">
                Crop
              </Button>
            ) : null}
          </div>
        </DialogFooter>
      </DialogContent>
    </DialogPrimitive>
  )
}

export default Dialog
