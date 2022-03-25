import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cell';

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {

  const app = express();

  app.use(createCellsRouter(filename, dir));

  const packagePath = require.resolve('@jsnotelepard/local-client/build/index.html');
  if (useProxy) {
    app.use(createProxyMiddleware({
      target: 'http://localhost:1991',
      ws: true,
      logLevel: 'silent'
    }));

  } else {
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });

};

/**
          STEPS TO SET UP A TYPESCRIPT

 * 1. Run npx tsc -- init into your main dir
 * 2. Update the tsconfig.json with uncommenting option {"outDir": "./dist" } 
    and setting it to the folder where you want the ts to be compiled
    Also uncomment the {"direction"} option too for using the types definition ".*.d.ts"
 * 3. Update package json
    {
      "name": "local-api",
      "version": "1.0.0",
      "description": "",
      
      # START #
      # We need those options if we want to import the package as moudle
      
      "main": "./dist/index.js", ------- > if anyone import the module to use the compiled file 
      "types": "./dist/index.d.ts", ------- > if anyone import the module to say which is the type definition file

      # END #
      
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "tsc --watch --preserveWatchOutput" ------ > this is to start compiling ts
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "typescript": "^4.6.2"
      }
    }
    

 


 */
