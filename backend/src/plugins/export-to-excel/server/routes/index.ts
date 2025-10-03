export default [
  {
    method: 'POST',
    path: '/export-to-excel',
    handler: 'ExportController.exportToExcel',
    config: {
      policies: [],
    },
  },
]
