declare type Recordable<T = any> = Record<string, T>;

/* __APP_INFO__ */
declare const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };
  