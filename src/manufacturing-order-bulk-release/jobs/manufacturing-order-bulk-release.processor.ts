import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PinoLogger } from "nestjs-pino";
import * as _ from 'lodash';
import * as moment from 'moment';

import { M3ClientService } from "../../util/m3-client.service";
import NotificationService from "../../util/notification.service";
import EmailService from "../../util/email.service";
import TemplateSerivce from "../../util/template.service";

import { MopsDataSource } from '../data-source/allMop.datasource';

import { Notification } from '../../util/dto/notification.dto';
import { M3Restructered } from "../../util/dto/m3response.dto";

import { m3ResponseRestructed } from '../../util/utils';

@Processor('bulk-release')
export class BulkReleaseProcessor {
    constructor(
        private m3Client: M3ClientService,
        private notificationService: NotificationService,
        private emailService: EmailService,
        private templateService: TemplateSerivce,
        private mopDataSource: MopsDataSource,
        private logger: PinoLogger
    ) {}

    @Process('updat')
    async update(job: Job){
        const {data: { userId, ...rest }} = job;
       try {
           const startTime = moment().format('hh:mm:ss');
           const { facility, scheduleNumbers } = rest;
           const scheduleInput = {
                division: '',
                maxRecord: 0,
                program: ('PMS170MI').trim(),
                transaction: ('Updat').trim(),
                output: [],
            }
            const notification: Notification = {
                priority: 'HIGH',
                type: 'SUCCESS',
                moveToInbox: true,
                deleteWarning: false,
                data: {}
            }
           const vlue = await Promise.all(_.map(scheduleNumbers, async (o: number) => {
                return await this.mopDataSource.getAllMops(facility, o);
            }));
           const summaryResult = _.chain(await Promise.all(_.chain(await Promise.all(_.chain(vlue).map( async (o) => {
            const {mmoplp} = o;
             return await Promise.all(_.chain(mmoplp).map( async (o) => {
                 const {plannedOrder, scheduleNumber} = o;
                 const input = new Map<string, string>();
                 input.set('CONO', '200');
                 input.set('PLPN', plannedOrder.toString());
                 input.set('SCHN', scheduleNumber.toString());
                 input.set('PSTS', '60');
                 const {isError, ...other} = m3ResponseRestructed(await this.m3Client.callGet({
                     ...scheduleInput,
                     company: '200',
                     input
                 }));
                 return {isError, ...other};
             }).value());
        }).value())).map( async (o, i) => {
            const scheduleNo = scheduleNumbers[i];
            let releasedMops = null;
            try {
                releasedMops = await this.mopDataSource.getAllMops(facility, scheduleNo);   
            } catch (error) {
                releasedMops = {mmoplp: [], totoal: 1};
            }
            await this.notificationService.notifyUser(userId, {
                ...notification,
                type: releasedMops.total !== 0 ? 'ERROR' : 'SUCCESS',
                data: {
                    message: releasedMops.total !== 0 ? `Couldn't complete bulk release ${scheduleNo}` : `Bulk release completed ${scheduleNo}`,
                    data: {
                        summary: o,
                        scheduleNo,
                        releasedSuccess: releasedMops.total === 0
                    }
                }
            })
            return o;
        }).value())).reduce((acc, cur) => {
            const noOfOrders = cur.length;
            const noOfCompleted = cur.filter((e: M3Restructered) => !e.isError).length;
            return {
                noOfOrders: acc.noOfOrders + noOfOrders,
                noOfCompleted: acc.noOfCompleted + noOfCompleted,
                noOfFailed: acc.noOfFailed + (noOfOrders - noOfCompleted)
            }
        }, {noOfOrders: 0, noOfCompleted: 0, noOfFailed: 0}).value();
        const template = await this.templateService.changeScheduleContent({
            ...summaryResult,
            startTime,
            endTime: moment().format('hh:mm:ss'),
            date: moment().format('MM/DD/YYYY')
        });
        await this.emailService.send({
            to: 'gayanmadu@fortude.co',
            from: 'noreply@brandix.com',
            subject: 'MOP Scheduling & Release',
            template
        });
       } catch (error) {
        this.logger?.info('Bulk Release Error', JSON.stringify(error));
       }
    }
}