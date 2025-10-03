import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import { ExportButtonComponent } from './components/ExportButton';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent("editView", "informations", {
      name: "export-to-excel-button",
      Component: () => <ExportButtonComponent />,
    });
  },

};
