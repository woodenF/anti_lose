/**
 * 发送者类型
 * 0
 */
export enum sendType {
  // 己方作为发送者
  SEND = 0,
  // 己方作为接受者
  RECEIVE = 1
}

export enum messageType {
  TEXT = 1,
  IMG = 2,
  SYSTEM = 3
}