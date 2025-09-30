# duplicate-file-doctor

是一个 CLI 工具，用来查看本地重复文件，并提供 web 服务预览/删除。

## 使用

```bash
npx duplicate-file-doctor "C:/User/qzda/Pictures/"
# or
cd C:/User/qzda/Pictures/
npx duplicate-file-doctor .

# 指定扩展名
npx duplicate-file-doctor . -e js,ts
# 自定义端口
npx duplicate-file-doctor . -p 3001
```

## 选项

- `-e, --ext` 要搜索的文件扩展名，例如：js,ts
- `-p, --port` 使用端口，默认 3000
- `-h, --help` 显示帮助
- `-v, --version` 显示版本

## 开发

本项目依赖 [`Bun`](https://bun.sh)。

```bash
bun i
bun dev
# duplicate-file-doctor <path> [options]
```
