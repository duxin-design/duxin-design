import type { Plugin } from "vite";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import pc from "picocolors";

dayjs.extend(duration);

export function viteBuildInfo(): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  let outDir: string;
  return {
    name: "vite:buildInfo",
    configResolved(resolveConfig) {
      config = resolveConfig;
      outDir = resolveConfig.build?.outDir ?? "dist";
    },
    buildStart() {
      console.log(
        pc.bold(
          pc.bgGreen(
            `欢迎使用vite-react-admin如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/duxinyues/vite-react`
          )
        )
      );
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    closeBundle() {
        if (config.command === "build") {
          endTime = dayjs(new Date());
          console.log(
            pc.bold(
              pc.bgGreen(
                `🎉恭喜打包完成（总用时${dayjs
                  .duration(endTime.diff(startTime))
                  .format("mm分ss秒")}`
              )
            )
          );
        }
      }
  };
}
