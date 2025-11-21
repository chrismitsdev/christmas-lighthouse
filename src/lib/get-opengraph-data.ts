import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

export async function getOpengraphData(): Promise<{
  base64Src: string
  font: Buffer<ArrayBuffer>
}> {
  // Logo load
  const logoData = await readFile(
    join(process.cwd(), 'public/shared/opengraph.png'),
    'base64'
  )
  const base64Src = `data:image/png;base64,${logoData}`

  // Font load
  const font = await readFile(
    join(process.cwd(), 'public/shared/manrope-semibold.ttf')
  )

  return {base64Src, font}
}
