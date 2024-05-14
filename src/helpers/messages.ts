export enum MessageLevelEnum {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFORM = 'INFORM',
  SUCCESS = 'SUCCESS',
}

export type IMessage = {
  level: MessageLevelEnum;
  detail: string;
  code?: string;
};

export class MessageList {
  private readonly messages: Map<string, IMessage> = new Map();

  private add(level: MessageLevelEnum, detail: string, code?: string): void {
    this.messages.set(`${level}.${detail}.${code}`, {
      level,
      code,
      detail,
    });
  }

  error(message: string, code?: string): void {
    this.add(MessageLevelEnum.ERROR, message, code);
  }

  warning(message: string, code?: string): void {
    this.add(MessageLevelEnum.WARNING, message, code);
  }

  inform(message: string, code?: string): void {
    this.add(MessageLevelEnum.INFORM, message, code);
  }

  success(message: string, code?: string): void {
    this.add(MessageLevelEnum.SUCCESS, message, code);
  }
}
