export interface ProcessEnv {
  [key: string]: string;
}

export interface ClassConstructor {
  new (...args: any[]): object;
}

export interface CurrentUserPayload {
  id: number;
  email: string;
  admin: boolean;
}
