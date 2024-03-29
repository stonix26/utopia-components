export function bytesToMB(size: number): number {
  return size * 1024 * 1024
}

export async function convertBlobUrlToOriginalFileType(
  blobUrl: string,
  filename: string
): Promise<File | null> {
  try {
    const response = await fetch(blobUrl)
    const blobData = await response.blob()

    // Create a new File object from the Blob data
    const file = new File([blobData], filename, { type: blobData.type })

    return file
  } catch (error) {
    // eslint-disable-next-line no-console -- TEMP
    console.error('Error converting Blob URL to original file type:', error)
    return null
  }
}
