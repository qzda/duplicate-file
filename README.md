# Duplicate File Doctor (🚧 In Dev)

A CLI tool to find duplicate files locally, with a web service for previewing and deleting them.

## Usage

```bash
npx duplicate-file-doctor "C:/User/qzda/Pictures/"
# or
cd C:/User/qzda/Pictures/
npx duplicate-file-doctor .

# Specify file extensions
npx duplicate-file-doctor . -e js,ts
# Custom port
npx duplicate-file-doctor . -p 3001
```

## Options

- `-e, --ext` File extensions to search for, e.g.: js,ts
- `-p, --port` Port to use, default is 3000
- `-h, --help` Show help
- `-v, --version` Show version

## Development

This project depends on [`Bun`](https://bun.sh).

```bash
bun i
bun dev
# duplicate-file-doctor <path> [options]
```
