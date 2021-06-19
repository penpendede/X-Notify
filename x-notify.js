/*
* Website: https://www.xtrendence.com
* Portfolio: https://www.xtrendence.dev
* GitHub: https://www.github.com/Xtrendence
*/
class XNotify {
  constructor (position) {
    this.position = this.empty(position) ? 'TopRight' : position

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
    this.width = 'width' in options ? options.width : this.defaults.width

    this.title = 'title' in options ? options.title : this.defaults[type].title

    this.description = 'description' in options ? options.description : this.defaults[type].description

    this.duration = 'duration' in options ? options.duration : this.defaults.duration

    this.notificationClass = type
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
    row.id = this.generateID()
    row.classList.add(this.position)

    const notification = document.createElement('div')
    notification.classList.add('x-notification')
    notification.classList.add(this.notificationClass)

    notification.innerHTML = '<span class="title" class="' + this.notificationClass + '">' + this.title + '</span>' +
    '<span class="description">' + this.description + '</span>'

    row.append(notification)

    return row
  }

  showNotification (element) {
    const container = document.getElementById('x-notify-container')

    const notification = element.getElementsByClassName('x-notification')[0]

    if (this.position === 'BottomRight' || this.position === 'BottomLeft') {
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
      notification.style.opacity = opacity
      if (opacity >= 1) {
        notification.style.opacity = 1
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
      notification.style.opacity = opacity
      if (opacity <= 0) {
        element.remove()
        clearInterval(animation)
      }
    }, 10)

    if (container.scrollHeight <= window.innerHeight) {
      container.style.height = 'auto'
    }

    if (this.empty(container.innerHTML)) {
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

  generateID () {
    let id = this.epoch() + '-' + this.shuffle(this.epoch())

    if (this.empty(document.getElementById('x-notify-container').innerHTML)) {
      return id
    }

    let invalid = true

    while (invalid) {
      if (document.getElementById(id)) {
        id = this.epoch() + '-' + this.shuffle(this.epoch())
      } else {
        invalid = false
        break
      }
    }

    return id
  }

  shuffle (string) {
    const parts = string.toString().split('')
    for (let i = parts.length; i > 0;) {
      const random = parseInt(Math.random() * i)
      const temp = parts[--i]
      parts[i] = parts[random]
      parts[random] = temp
    }
    return parts.join('')
  }

  epoch () {
    const date = new Date()
    const time = Math.round(date.getTime() / 1000)
    return time
  }

  empty (value) {
    if (value === null || typeof value === 'undefined' || value.toString().trim() === '') {
      return true
    }
    return false
  }
}
