import { Injectable, NotFoundException } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export default class GraphqlClientService {
  FEDERATION_URL: string;
  G_CLIENT_TIMEOUT: number;
  constructor(private _config: ConfigService, private _logger: PinoLogger) {
    // this.FEDERATION_URL = this._config.get('datasource.federation.url');//this._config.get('datasource.graphql.gateway.url');
    this.G_CLIENT_TIMEOUT = this._config.get('datasource.federation.clientTimeout');
    this.FEDERATION_URL = 'http://localhost:3091/graphql'
  }

  async getData(variables: any,
    query, outputName: string,) {
    if (!variables || !query) {
      throw new NotFoundException('Not found inputs');
    }
    this._logger.debug('Before calling graphql client - ' + outputName);
    const graphQLClient = new GraphQLClient(this.FEDERATION_URL, { timeout: +this.G_CLIENT_TIMEOUT ? 9000 : Number(this.G_CLIENT_TIMEOUT) });
    const gqlResult = await graphQLClient.request(query, variables);
    const result: any = gqlResult[outputName];
    this._logger.debug('After calling graphql client - ' + outputName);
    return result;
  }
}
