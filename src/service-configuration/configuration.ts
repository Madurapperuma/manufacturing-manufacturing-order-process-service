import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';

import configValidationSchema from './configuration.schema';

async function fetchConfig() {
  const http = new HttpService();
  const logger = new Logger();
  const headers = {
    source: 'service',
  };
  let responseRaw: Observable<AxiosResponse<any>>;

  const configurationUrl = `${process.env.CONFIGURATION_BASE_URL}/${process.env.SERVICE_NAME}/${process.env.STAGE}`;

  responseRaw = http.get(configurationUrl, { headers }).pipe(
    catchError((e) => {
      if (e.response && e.response.status === 404) {
        logger.error(
          `cannot find configurations on ${configurationUrl}. make sure configurations are published under correct service name and environment`,
        );
      }
      return throwError(() => new Error(e));
    }),
  );

  logger.log(`fetching configurations from ${configurationUrl}`);
  const respose = await firstValueFrom(responseRaw);
  const configData = respose.data;
  await configValidationSchema.validateAsync(configData).catch((err) => {
    logger.error(err);
    throw new Error(err);
  });
  logger.log(
    `configuration data validated from ${configData.service.serviceName}|${configData.service.stage}|${configData.service.id}`,
  );
  return configData;
}
export default fetchConfig;
