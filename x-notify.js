/*
* Website: https://www.xtrendence.com
* Portfolio: https://www.xtrendence.dev
* GitHub: https://www.github.com/Xtrendence
*/
class XNotify {
  constructor (position) {
    this.position = position || 'TopRight'

    this.defaults = {
      duration: 5000,
      success: {
        title: 'Success Notification',
        description: 'Whatever you did, it worked.'
      },
      error: {
        title: 'Error Notification',
        description: 'That didn\'t work out, did it?'
      },
      alert: {
        title: 'Alert Notification',
        description: 'This is probably important...'
      },
      info: {
        title: 'Info Notification',
        description: 'Just so you know...'
      }
    }
  }

  setOptions (options, type) {
    ['width', 'title', 'description', 'duration'].forEach(name => {
      if (name in options) {
        this[name] = options[name]
      } else if (type in this.defaults && name in this.defaults[type]) {
        this[name] = this.defaults[type][name]
      } else {
        this[name] = this.defaults[name]
      }
    })
    this.type = type || 'info'
  }

  success (options) {
    this.setOptions(options, 'success')
    this.showNotification(this.createElement())
  }

  error (options) {
    this.setOptions(options, 'error')
    this.showNotification(this.createElement())
  }

  alert (options) {
    this.setOptions(options, 'alert')
    this.showNotification(this.createElement())
  }

  info (options) {
    this.setOptions(options, 'info')
    this.showNotification(this.createElement())
  }

  createElement () {
    if (!document.getElementById('x-notify-container')) {
      const body = document.getElementsByTagName('body')[0]

      const container = document.createElement('div')
      container.id = 'x-notify-container'
      container.classList.add(this.position)

      body.appendChild(container)
    }

    const row = document.createElement('div')
    row.id = this.uuidv4()
    row.classList.add(this.position)

    const notification = document.createElement('div')
    notification.classList.add('x-notification')
    notification.classList.add(this.type)

    notification.innerHTML = [
      '<span class="title" class="' + this.type + '">',
      this.title,
      '</span>',
      '<span class="description">',
      this.description,
      '</span>'
    ].join('')

    row.append(notification)

    return row
  }

  showNotification (element) {
    const container = document.getElementById('x-notify-container')

    const notification = element.getElementsByClassName('x-notification')[0]

    if (['BottomRight', 'BottomLeft'].indexOf(this.position) > -1) {
      container.append(element)
      if (container.scrollHeight > window.innerHeight) {
        container.style.height = 'calc(100% - 20px)'
      }
      container.scrollTo(0, container.scrollHeight)
    } else {
      container.prepend(element)
    }
    let opacity = 0.05
    const animation = setInterval(() => {
      opacity += 0.05
      notification.style.opacity = Math.min(opacity, 1.0)
      if (opacity >= 1.0) {
        clearInterval(animation)
      }
    }, 10)

    setTimeout(() => {
      this.hideNotification(element)
    }, this.duration)
  }

  hideNotification (element) {
    const container = document.getElementById('x-notify-container')

    const notification = element.getElementsByClassName('x-notification')[0]

    let opacity = 1
    const animation = setInterval(() => {
      opacity -= 0.05
      notification.style.opacity = Math.max(opacity, 0.0)
      if (opacity <= 0) {
        element.remove()
        clearInterval(animation)
      }
    }, 10)

    if (container.scrollHeight <= window.innerHeight) {
      container.style.height = 'auto'
    }

    if (!container.innerHTML) {
      container.remove()
    }
  }

  clear () {
    const container = document.getElementById('x-notify-container')
    const notifications = container.getElementsByClassName('x-notification')

    for (let i = 0; i < notifications.length; i++) {
      this.hideNotification(notifications[i])
    }
  }

  uuidv4 () { // see https://gist.github.com/jed/982883
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}
