import { ext } from './utils'

const $grid = document.createElement('div')

$grid.id = 'grid-overlay'
$grid.style.zIndex = '9999'
$grid.style.pointerEvents = 'none';
$grid.style.opacity = 'var(--opacity, 1)'
$grid.style.display = 'grid';
$grid.style.gridTemplateColumns = 'repeat(var(--cols), 1fr)'
$grid.style.gridTemplateRows = '1fr'
$grid.style.position = 'fixed';
$grid.style.top = '0'
$grid.style.right = '0'
$grid.style.bottom = '0'
$grid.style.left = '0'
$grid.style.margin = 'auto'
$grid.style.mixBlendMode = 'exclusion'
$grid.style.background = 'linear-gradient(180deg, var(--colour) 1px, transparent 0px) 0 0 / 100% 40px repeat-y'

const $cell = document.createElement('div')
$cell.style.borderLeft = '1px solid var(--colour)'

ext.runtime.onMessage.addListener(({ payload = {} }) => {
  const el = document.getElementById($grid.id)
  const frag = document.createDocumentFragment()

  while ($grid.firstElementChild) {
    $grid.removeChild($grid.firstElementChild)
  }

  for (const [k, v] of Object.entries(payload)) {
    $grid.style.setProperty(`--${k}`, v.toString())
  }

  for (let i = 0, l = payload.cols; i < l; i++) {
    $grid.appendChild($cell.cloneNode())
  }

  frag.appendChild($grid.cloneNode(true))

  if (!el) {
    document.body.appendChild(frag.cloneNode(true))
  } else {
    document.body.replaceChild(frag.cloneNode(true), el)
  }
});
