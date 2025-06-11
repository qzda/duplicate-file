import http from "node:http";
import prolog from "@qzda/prolog";

interface ServerConfig {
  path: string;
  port: number;
}

export function startServers(
  data: Record<string, string[]>,
  config: ServerConfig
) {
  const localServer = http.createServer((req, res) => {
    const { method = "" } = req;
    switch (method) {
      case "GET":
        res.writeHead(200, {
          "Content-Type": "application/json;charset=utf-8",
        });
        res.end(JSON.stringify(data));
        break;
      default:
        res.writeHead(405, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(`${method} not supported`);
    }
  });

  try {
    localServer.listen(config.port, () => {
      console.log(
        `Open this link to preview: ${prolog.underline(
          prolog.blue(`http://localhost:${config.port}/`)
        )}`
      );
      console.log();
    });
  } catch (error) {}

  return localServer;
}
