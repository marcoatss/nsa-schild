import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async exportToExcel(ctx: any) {
    const exportFile = await strapi
      .plugin('export-to-excel')
      .service('ExportService')
      .exportToExcel(ctx.request.body);

    ctx.set('Content-Type', 'application/vnd.ms-excel');
    ctx.set('Content-Disposition', 'attachment; filename=export.xlsx');
    ctx.send(exportFile);
  },
});
