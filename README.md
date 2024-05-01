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
import { AlbionSDK } from "albion-sdk";
/* OR */
const { AlbionSDK } = require("albion-sdk");

const sdk = new AlbionSDK("Americas");

sdk
  .search("man")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.error(e);
  });
```

## Render Service URL Builders

This package exposes several functions to generate URLs for the Albion Online Render Service, making it easy to integrate the Render Service into your application.

The following functions are available:

- itemIconUrl(item: string, params?: RenderItemParams): string
- spellIconUrl(spell: string, params?: RenderSpellParams): string
- wardrobeIconUrl(item: string): string
- destinyBoardIconUrl(node: string, params?: RenderDestinyBoardParams): string
- guildLogoUrl(params: RenderGuildLogoParams): string
