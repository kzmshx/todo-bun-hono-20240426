import type { Container } from "./dependency-injection";

export type HonoEnv = {
  Variables: {
    container: Container;
  };
};
