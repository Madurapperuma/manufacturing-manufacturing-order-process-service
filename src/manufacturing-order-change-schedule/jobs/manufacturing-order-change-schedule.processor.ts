import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PinoLogger } from "nestjs-pino";
import _ from 'lodash';

import { M3ClientService } from "../../util/m3-client.service";
import NotificationService from "../../util/notification.service";
import EmailService from "../../util/email.service";
import TemplateSerivce from "src/util/template.service";

import { ChangeScheduleArgs } from "../args/change-schedule.args";

import { Notification } from '../../util/dto/notification.dto';

import { m3ResponseRestructed, ContentDetails } from '../../util/utils';

@Processor('change-schedule')
export class ChangeScheduleProcessor {
    constructor(
        private m3Client: M3ClientService,
        private notificationService: NotificationService,
        private emailService: EmailService,
        private templateService: TemplateSerivce,
        private logger: PinoLogger
    ) {}

    @Process('updat')
    async update(job: Job){
        const {data: { userId, ...rest }} = job;
        try {
            this.logger.trace('Starting Change-Schedule Job...');
            const {inputData, currentScheduleNo} = rest;
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
            // console.log(`${__dirname}` __dirname);
            const results = await Promise.all(inputData.map( async (e: ChangeScheduleArgs) => {
                this.logger?.info('Change-Schedule updateing', JSON.stringify(e));
                const {plannedOrder, scheduleNo, status, company} = e;
                const input = new Map<string, string>();
                input.set('CONO', company.toString());
                input.set('PLPN', plannedOrder.toString());
                input.set('SCHN', scheduleNo.toString());
                if(status){
                    input.set('PSTS', '60');
                }
                const {isError, ...other} = m3ResponseRestructed(await this.m3Client.callGet({
                    ...scheduleInput,
                    company: company.toString(),
                    input
                }));
                // NOTE: Change-schedule m3Client response empty array Object.
                this.logger?.info(`Change Schedule result: ${JSON.stringify(e)}`)
                await this.notificationService.notifyUser(userId, {
                    ...notification,
                    type: isError ? 'ERROR' : 'SUCCESS',
                    data: {
                        message: isError ? `Couldn't complete change-schedule ${other?.responseMessage?.errorMessage}` : `Schedule changed from ${currentScheduleNo} to ${scheduleNo}`
                    }
                })
                return {isError, ...other};
            }))
            const scheduleResults = ContentDetails(results);
            const template = await this.templateService.changeScheduleContent(scheduleResults);
            const emailV = await this.emailService.send({
                to: 'gayanmadu@fortude.co',
                from: 'noreply@brandix.com',
                subject: 'MOP Scheduling & Release',
                template

            });
            console.log(emailV);
        } catch (error) {
            this.logger?.info('Change-schedule Error', JSON.stringify(error));
            const notification: Notification = {
                priority: 'HIGH',
                type: 'ERROR',
                moveToInbox: true,
                deleteWarning: false,
                data: {
                    message: `Change-schedule Error: ${JSON.stringify(error)}`
                }
            }
            await this.notificationService.notifyUser(userId, notification);
        }
    }
}