import { env } from "~/env";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

const LEVEL_PRIORITIES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private logLevel: LogLevel;
  private name: string;

  constructor(name: string) {
    // Use client-safe log level that works in both server and client
    this.logLevel = env.NEXT_PUBLIC_LOG_LEVEL;
    this.name = name;
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_PRIORITIES[level] >= LEVEL_PRIORITIES[this.logLevel];
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const levelStr = level.toUpperCase();
    const prefix = `[${timestamp}] [${this.name}] [${levelStr}]`;

    if (context && Object.keys(context).length > 0) {
      return `${prefix} ${message} ${JSON.stringify(context)}`;
    }

    return `${prefix} ${message}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog("debug")) {
      // eslint-disable-next-line no-console
      console.log(this.formatMessage("debug", message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog("info")) {
      // eslint-disable-next-line no-console
      console.log(this.formatMessage("info", message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog("warn")) {
      // eslint-disable-next-line no-console
      console.warn(this.formatMessage("warn", message, context));
    }
  }

  error(message: string, context?: LogContext): void {
    if (this.shouldLog("error")) {
      // eslint-disable-next-line no-console
      console.error(this.formatMessage("error", message, context));
    }
  }

  // Helper method to create logger with default context
  withContext(defaultContext: LogContext) {
    return {
      debug: (message: string, context?: LogContext) =>
        this.debug(message, { ...defaultContext, ...context }),
      info: (message: string, context?: LogContext) =>
        this.info(message, { ...defaultContext, ...context }),
      warn: (message: string, context?: LogContext) =>
        this.warn(message, { ...defaultContext, ...context }),
      error: (message: string, context?: LogContext) =>
        this.error(message, { ...defaultContext, ...context }),
    };
  }
}

// Factory function to create named loggers
export function createLogger(name: string): Logger {
  return new Logger(name);
}

// Pre-configured named loggers for common use cases
export const authLogger = createLogger("AUTH");
export const apiLogger = createLogger("API");
export const dbLogger = createLogger("DB");
export const trpcLogger = createLogger("TRPC");
