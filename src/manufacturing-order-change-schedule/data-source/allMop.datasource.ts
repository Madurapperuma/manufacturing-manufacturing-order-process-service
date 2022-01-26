import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PinoLogger } from 'nestjs-pino';
import GraphqlClientService from 'src/util/graphql.service';
import {GET_ALL_MOPS} from '../query/get-all-mops.gql';

@Injectable()
export class MopsDataSource {
    constructor(private graphqlClient: GraphqlClientService){}

    async getAllMops(facility: string, scheduleNo: number, co: string = '', style: string = '') {
        return await this.graphqlClient.getData({
            co,
            facility,
            style,
            scheduleNo,
        }, GET_ALL_MOPS, 'getAllMop')
    }
}