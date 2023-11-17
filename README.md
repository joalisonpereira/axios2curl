# Axios2curl

![](./docs/badge-statements.svg) ![](./docs/badge-functions.svg) ![](./docs/badge-lines.svg) ![](./docs/badge-branches.svg)

An axios plugin that translates requests into cURL commands.

## Install

```bash
npm install axios2curl@latest
```

## Usage

```javascript
import { axios2Curl } from 'axios2curl';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

axios2Curl(api, (curl) => console.info(curl));
```

## Disable the logger

By default, all requests will be logged. However, you can disable this behavior on a per-request basis by setting the header `___DISABLE_CURL___` to true. Rest assured, we will remove this header before your request is processed.

```javascript
import { axios2Curl, DISABLE_HEADER } from 'axios2curl';
import axios from 'axios';

axios
  .get(
    'http://localhost:3000',
     headers: {
      [DISABLE_HEADER]: 'true'
    }
)
  .then(() => {
    console.log('Success');
  })
  .catch(() => {
    console.log('Error');
  });
```
