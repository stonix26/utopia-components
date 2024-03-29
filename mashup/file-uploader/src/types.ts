import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  MouseEventHandler,
  RefAttributes,
  SVGProps
} from 'react'
import type { DropzoneOptions, DropzoneState } from 'react-dropzone'
import type { Area, Point } from 'react-easy-crop'

// ------------------------------ HOOK TYPES --------------------------
export interface FileWithPreview {
  id: string
  file: File
  preview: string
}

export interface CustomFile {
  id: string
  file: File
}

export interface FileUploaderStates
  extends Omit<DropzoneState, 'acceptedFiles'> {
  withBlobFiles: FileWithPreview[]
  files: CustomFile[]
  disabled?: boolean

  // Dialog states
  dialogImage: FileWithPreview | null
  setDialogImage: React.Dispatch<React.SetStateAction<FileWithPreview | null>>

  // Cropper states
  isCropping: boolean
  setIsCropping: React.Dispatch<React.SetStateAction<boolean>>
  crop: Point
  setCrop: React.Dispatch<React.SetStateAction<Point>>
  onCropComplete: (paramCroppedArea: Area, paramCroppedAreaPixels: Area) => void
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  rotation: number
  setRotation: React.Dispatch<React.SetStateAction<number>>
  mergeCroppedImage: () => Promise<void>

  // Option states
  downloadFile?: (file: File) => void
  removeFile?: (id: FileWithPreview['id']) => void
  clearAllFiles?: () => void

  // Some states
  acceptedFileTypes: string
}

export type FileUploaderHook = (
  options?: DropzoneOptions | undefined
) => FileUploaderStates

// ------------------------------ HOOKS ------------------------------

// ------------------------------ COMPONENTS ------------------------
export interface FileUploaderProps extends HTMLAttributes<HTMLDivElement> {
  configParams: FileUploaderStates
}

export type IconType = ForwardRefExoticComponent<
  RefAttributes<SVGSVGElement> & Partial<SVGProps<SVGSVGElement>>
>

export interface FilePreviewProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<FileWithPreview, 'id'> {
  onPreviewClick?: MouseEventHandler<HTMLButtonElement> | undefined
  disabled?: boolean
  options: {
    id: string | number
    name: string
    icon: IconType
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
  }[]
}

export interface DialogProps
  extends Pick<
    FileUploaderStates,
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
