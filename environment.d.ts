declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      TEST_PORT: number;
      DATABASE_URL: string;
      HOST: number;
      JWT_SECRET: string;
      EMAIL: string;
      PASS: string;
    }
  }
}

export {};
