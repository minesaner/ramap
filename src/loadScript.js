function createScript(src) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  script.defer = true
  script.async = true
  script.charset = 'utf-8'
  return script
}

const DEFAULT = {callback: '__amap_load_callback__'}
function loadMapScript(options) {
  options = Object.assign({}, DEFAULT, options)
  const {v, key, callback} = options
  const src = `https://webapi.amap.com/maps?` +
    `v=${v}&` +
    `key=${key}&` +
    `callback=${callback}`
  const script = createScript(src)

  return new Promise(resolve => {
    window[callback] = () => {
      resolve()
      delete window[callback]
    }
    document.body.appendChild(script)
  })
}
loadMapScript.loadPlugins = function (pluginNames) {
  pluginNames = [].concat(pluginNames)

  return new Promise(resolve => {
    window.AMap.plugin(pluginNames, () => {
      resolve()
    })
  })
}

function loadUIScript() {
  const script = createScript('https://webapi.amap.com/ui/1.0/main.js')
  return new Promise(resolve => {
    script.onload = function () {
      resolve()
    }
    document.body.appendChild(script)
  })
}
loadUIScript.loadModule = function (moduleNames) {
  moduleNames = [].concat(moduleNames)
  return new Promise((resolve) => {
    window.AMapUI.load(moduleNames, function () {
      if (arguments.length > 1) {
        resolve(Array.from(arguments))
      } else {
        resolve(arguments[0])
      }
    })
  })
}

export {
  loadMapScript,
  loadUIScript,
}
