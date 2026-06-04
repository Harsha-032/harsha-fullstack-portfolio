import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const baseUrl = process.env.VITE_VERIFY_URL || 'http://127.0.0.1:5174/'
const outputDir = new URL('../test-artifacts/', import.meta.url)
const executablePath = (
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
  '/usr/bin/google-chrome'
)

async function readCanvasPixels(page) {
  return page.locator('canvas').evaluate((canvas) => {
    const gl = (
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true })
    )

    if (!gl) {
      return { supported: false, samples: [] }
    }

    const width = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight
    const points = [
      [Math.floor(width * 0.5), Math.floor(height * 0.5)],
      [Math.floor(width * 0.7), Math.floor(height * 0.35)],
      [Math.floor(width * 0.28), Math.floor(height * 0.58)],
    ]

    const samples = points.map(([x, y]) => {
      const pixel = new Uint8Array(4)
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel)
      return Array.from(pixel)
    })

    return { supported: true, samples }
  })
}

async function verifyViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport })

  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.waitForSelector('canvas')
  await page.waitForTimeout(1200)

  const canvasBox = await page.locator('canvas').boundingBox()
  const pixels = await readCanvasPixels(page)

  await page.screenshot({
    path: new URL(`${name}.png`, outputDir).pathname,
    fullPage: true,
  })

  await page.close()

  const hasVisibleCanvas = Boolean(
    canvasBox &&
    canvasBox.width > 100 &&
    canvasBox.height > 100
  )
  const hasNonBlankPixels = pixels.samples.some((sample) => {
    const [r, g, b, a] = sample
    return a > 0 && (r + g + b) > 20
  })

  return {
    name,
    hasVisibleCanvas,
    hasNonBlankPixels,
    canvasBox,
    pixels,
  }
}

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ executablePath })

try {
  const results = [
    await verifyViewport(browser, 'desktop-3d-ui', {
      width: 1440,
      height: 1000,
    }),
    await verifyViewport(browser, 'mobile-3d-ui', {
      width: 390,
      height: 844,
    }),
  ]

  console.log(JSON.stringify(results, null, 2))

  const failed = results.some((result) => (
    !result.hasVisibleCanvas ||
    !result.hasNonBlankPixels
  ))

  if (failed) {
    process.exitCode = 1
  }
} finally {
  await browser.close()
}
