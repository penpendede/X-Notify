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
    ['title', 'description', 'duration'].forEach(name => {
      this[name] = (name in options)
        ? options[name]
        : (
            (type in this.defaults && name in this.defaults[type])
              ? this.defaults[type][name]
              : this.defaults[name]
          )
    })
    this.type = type || 'info'
  }

  display (options, type) {
    this.setOptions(options, type)
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
      '<span class="title" class="',
      this.type,
      '">',
      this.title,
      '</span>',
      '<span class="description">',
      this.description,
      '</span>'
    ].join('')

    row.append(notification)

    return row
  }

  opacityChanger (element, from, to, step) {
    let opacity = from + step
    const animation = setInterval(() => {
      opacity += step
      if (element) {
        element.style.opacity = from < to ? Math.min(opacity, to) : Math.max(opacity, to)
        if (from < to ? opacity >= to : opacity <= to) {
          clearInterval(animation)
        }
      } else {
        clearInterval(animation)
      }
    }, 10)
  }

  showNotification (element) {
    const container = document.getElementById('x-notify-container')

    const notification = element.getElementsByClassName('x-notification')[0]

    if (['BottomRight', 'BottomLeft'].indexOf(this.position) > -1) {
      container.append(element)
      container.scrollHeight <= window.innerHeight || (container.style.height = 'calc(100% - 20px)')
      container.scrollTo(0, container.scrollHeight)
    } else {
      container.prepend(element)
    }
    this.opacityChanger(notification, 0, 1, 0.05)

    setTimeout(() => this.hideNotification(element), this.duration)
  }

  hideNotification (element) {
    const container = document.getElementById('x-notify-container')
    this.opacityChanger(element, 1, 0, -0.05)

    container.scrollHeight > window.innerHeight || (container.style.height = 'auto')
    container.innerHTML || container.remove()
  }

  clear () {
    const container = document.getElementById('x-notify-container')
    if (container) {
      const notifications = container.getElementsByClassName('x-notification')

      for (let i = 0; i < notifications.length; i++) {
        this.hideNotification(notifications[i])
      }
    }
  }

  uuidv4 () { // see https://gist.github.com/jed/982883
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}
