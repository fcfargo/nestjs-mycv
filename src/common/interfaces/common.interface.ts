export interface ProcessEnv {
  [key: string]: string;
}

export interface ClassConstructor {
  new (...args: any[]): object;
}

export interface SessionPayload {
  id: number;
  email: string;
}
