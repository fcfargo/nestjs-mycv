interface ProcessEnv {
  [key: string]: string;
}

export const processEnv: ProcessEnv = process.env as ProcessEnv;
