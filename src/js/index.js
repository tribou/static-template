import Debug from 'debug'
import $ from 'jquery'
import OfflineRuntime from 'offline-plugin/runtime'

const log = Debug('static:index')

window.jQuery = $
window.$ = $


// Progressively apply ServiceWorker updates so browser can simply be refreshed
// to reflect changes with window.location.reload()
OfflineRuntime.install({
  onUpdateReady: () => {

    log('onUpdateReady')
    OfflineRuntime.applyUpdate()

  },
})
