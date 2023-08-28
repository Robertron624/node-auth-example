import  logger  from "pino";
import dayjs from "dayjs";
import  config  from "config";

const level = config.get<string>("logLevel") || "info";

const log = logger({
    level,
    transport: {
        target: "pino-pretty",
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log;