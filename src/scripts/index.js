import { ext, storage } from './utils'

ext.tabs.query({ active: true }, ([t]) => {
  const bkg = ext.extension.getBackgroundPage()
  const $app = document.getElementById("app")
  const $fields = [].slice.call($app.querySelectorAll('input'))

  const update = () => {
    const payload = $fields.reduce((acc, f) => {
      const label = f.previousElementSibling

      if (label instanceof HTMLLabelElement) {
        label.innerHTML = f.value
      }

      acc[f.name] = f.value
      return acc
    }, {})

    try {
      storage.set(payload, () =>
        ext.tabs.sendMessage(t.id, { payload })
      )
    } catch (err) {
      bkg.console.error(err)
    }
  }

  try {
    storage.get(null, res => {
      $fields.forEach(f => f.name in res && (f.value = res[f.name]))
      update()
    })
  } catch (err) {
    bkg.console.error(err)
  }

  window.requestAnimationFrame(update)
  $app.addEventListener('input', update)
  $app.addEventListener('mousewheel', e => {
    const f = e.target

    if (f instanceof HTMLInputElement) {
      const inc = parseFloat(f.getAttribute('step') || 1)
      const v = parseFloat(f.value) + Math.max(-inc, Math.min(inc, -e.deltaY))

      f.value = v

      update()
    }

  })
});
