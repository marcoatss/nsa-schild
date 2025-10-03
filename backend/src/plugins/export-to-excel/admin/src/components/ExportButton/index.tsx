import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useCallback } from 'react';
import download from 'downloadjs';

import request from '../../utils/request';

export const ExportButtonComponent = () => {
  const { slug, initialData } = useCMEditViewDataManager();

  const handleClick = useCallback(async () => {
    const file = await request('/export-to-excel/export-to-excel', {
      method: 'POST',
      body: {
        data: initialData,
      },
    });

    download(file, `schild-quote-export-${initialData.id}.xlsx`, 'application/vnd.ms-excel');
  }, [initialData]);

  if (slug !== 'api::quote.quote') {
    return <></>;
  }

  return (
    <Box
      background="neutral0"
      paddingTop={6}
    >
      <Typography variant="sigma" textColor="neutral600">
        Export
      </Typography>
      <Box paddingTop={2} paddingBottom={4}>
        <Divider />
      </Box>
      <Button onClick={handleClick}>Export to Excel</Button>
    </Box>
  );
};
