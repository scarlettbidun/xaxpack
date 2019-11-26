# XaxPack

Some needed js shortcuts and functionalities for any kind of applications. It is good to have this in your backpack.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/xaxpack) to install xaxpack.

```bash
npm install xaxpack --save
```
```bash
npm update xaxpack
```

## Usage
Can be use like this:

```js
window.axios = require('axios')
window.toastr = require('toastr')
import { aMixins, printMsg } from 'xaxpack'

Vue.mixin(aMixins)
printMsg()
```
in Vue, you may want to write this.
 ```js
mounted () {
    this.xaxPackInit()
    ...
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/scarlettbidun/xaxpack/blob/master/LICENSE)