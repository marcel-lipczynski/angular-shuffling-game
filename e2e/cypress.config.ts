import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      on('after:run', (results) => {
        console.log(results);
      });
    },
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run angular-shuffling-game:serve:development',
        production: 'nx run angular-shuffling-game:serve:production',
      },
      ciWebServerCommand: 'nx run angular-shuffling-game:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
