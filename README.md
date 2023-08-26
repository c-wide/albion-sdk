# Albion Online SDK

> **Disclaimer:** This SDK is not affiliated with, endorsed, or sponsored by
> Albion Online or Sandbox Interactive GmbH.

A modern and efficient SDK for the Albion Online API.

Designed with ❤️ for both Node.js and Deno developers.

## Features

- 🌍 **Cross-Platform**: Designed for both Node.js and Deno.
- 🚀 **Small Bundle**: Optimized for size and speed.
- 🔎 **Comprehensive**: Complete access to all known Albion Online API
  endpoints.
- 📖 **Intuitive API**: Designed for clarity and ease of use.
- 🛠️ **Clean Code**: No unnecessary dependencies.

## Installation

### Node.js

```bash
npm install albion-sdk
yarn add albion-sdk
pnpm add albion-sdk
```

### Deno

```typescript
import { AlbionSDK } from "https://github.com/c-wide/albion-sdk/mod.ts"
```

## Usage

```javascript
import { AlbionSDK } from "albion-sdk"

const api = new AlbionSDK("west")

function demo() {
    const res = await api.search("man")

    if (!res.ok) return

    console.log(res.data)
}

demo()

```
