# Albion Online SDK

> **Disclaimer:** This SDK is not affiliated with, endorsed, or sponsored by
> Albion Online or Sandbox Interactive GmbH.

A modern and efficient SDK for the Albion Online API.

Designed with ❤️ for the Albion community.

## Features

- 🔎 **Comprehensive**: Complete access to all known Albion Online API
  endpoints.
- 📖 **Intuitive API**: Crafted for clarity and ease of use.
- 📘 **TypeScript-First**: Tailored for TypeScript developers, offering
  extensive type coverage.
- 🚀 **Small Bundle**: Optimized for size and speed.
- 🛠️ **Clean Code**: No unnecessary dependencies.
- 🌍 **Module Support**: Designed for ESM and CJS compatibility.

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
