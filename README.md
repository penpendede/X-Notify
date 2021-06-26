# X:/Notify (penpendede version)

This project is based on the original notification system by  **X:/Notify** by Xtrendence but follows a slightly
different approach. Instead of having just a single JavaScript file it uses JavaScript and less. The latter does
almost all the styling. Both files together are even smaller than the original single file.

| component(s) | size (plain) | size (minified) |
| ------------ | ------------ | --------------- |
| CSS          | 1709 Bytes   | 1410 Bytes      |
| JavaScript   | 3899 Bytes   | 2310 Bytes      |
| all          | 5608 Bytes   | 3720 Bytes      |

As far as the interface is concerned there is one major change: Instead of `success`,  `error`, `alert`, and `info`
there only is `display` - the kind of output is controlled by the optional second parameter that defaults to `'info'`.
In addition to this the style options no longer exists - as far as notifications are concerned I prefer consistency
over more freedom how they are displayed.
## Installation

To add X-Notify to a web page, you need to include **x-notify.js** and **x-notify.css** (alternatively
**x-notify.min.js** and **x-notify.min.css**), i.e. use

```
<script src="x-notify.js"></script>
<link rel="stylesheet" href="x-notify.css" type="text/css">
```

or similar.

## Usage:

```
const Notify = new XNotify('TopLeft');
```

```
Notify.display({
  title: 'Title',
  description: 'Description',
  duration: 4000
},
'success');
```

The above would show a notification on the top right of the screen and it'd stay there for 4 seconds before disappearing. There are quite a few options you can change, such as:

```
Notify.display({
  title: 'Failed to Upload File',
  description: 'The file you submitted couldn't be uploaded.',
  duration: 4000
},
'error');
```

There are 4 different notification types: 'success', 'error', 'alert', and 'info', all of which can be used in the following manner:

```
Notify.display(options, 'success');
Notify.display(options, 'error');
Notify.display(options, 'allert');
Notify.display(options, 'info'); // alternatively just 'Notify.display(options)'
```

Here's a list of all the options you can use, and acceptable values:

| Option       | Type    | Value                                              | Description                                                                          |
| ------------ | ------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| position     | String  | 'TopRight', 'BottomRight', 'BottomLeft', 'TopLeft' | Where the notification popup would appear (this is passed to the constructor).       |
| title        | String  | Usually, some short text.                          | The title of the notification; something like 'Upload Error', or 'Form Submitted'.   |
| description  | String  | A longer description of the event.                 | A description of the event the notification was shown for.                           |
| duration     | Integer | Any integer.                                       | The duration, in milliseconds, that the notification would stay on screen for.       |

A full example with a button click event listener, and a fully custom notification:

```
document.addEventListener('DOMContentLoaded', () => {
  const Notify = new XNotify();

  let custom = document.getElementById('custom');

  custom.addEventListener('click', () => {
    Notify.display({
      title: 'Customized Notification',
      description: 'Description of the notification.',
      duration: 10000
    },
    'info');
  });
});
```
