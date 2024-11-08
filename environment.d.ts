declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      TEST_PORT: number;
      DATABASE_URL: string;
      EMAIL: string;
      PASS: string;
    }
  }
}

export {};
