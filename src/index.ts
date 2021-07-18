const { sqrt, abs, sign, random, min, max, round, floor, ceil, atan2, PI } =
  Math
const R = 0
const G = 1
const B = 2
const A = 3

let is_stop = false
window.addEventListener('resize', () => {
  is_stop = true
  location.reload()
  setTimeout(() => location.reload())
})

const canvas = document.querySelector('canvas#paint') as HTMLCanvasElement
let { width, height, x: offsetX, y: offsetY } = canvas.getBoundingClientRect()
const ratio = min(width, height) / 256
width /= ratio
height /= ratio
canvas.width = width
canvas.height = height
const context = canvas.getContext('2d')

const cx = width / 2
const cy = height / 2
const radius = width > height ? height / 2 : width / 2

let l = 50
function draw() {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx
      const dy = y - cy
      const r = sqrt(dx * dx + dy * dy)
      if (r > radius) continue
      const rad = atan2(dy, dx)
      const h = floor((rad * 180) / PI + 90)
      const s = floor((r / radius) * 100)
      context.fillStyle = `hsl(${h},${s}%,${l}%)`
      context.fillRect(x, y, 1, 1)
    }
  }
  timer = 0
}
let timer = requestAnimationFrame(draw)

canvas.addEventListener('mousemove', event => {
  const { clientX, clientY } = event
  const x = (clientX - offsetX) / ratio - cx
  const y = (clientY - offsetY) / ratio - cy
  const r = sqrt(x * x + y * y)
  if (r > radius) return
  l = (r / radius) * 100
  if (!timer) {
    timer = requestAnimationFrame(draw)
  }
})
