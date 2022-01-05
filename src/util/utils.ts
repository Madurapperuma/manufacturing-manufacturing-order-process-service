import { M3Response, M3Restructered } from './dto/m3response.dto';
import * as moment from 'moment';

export const m3ResponseRestructed = (response: M3Response) : M3Restructered => {
    const {nrOfFailedTransactions, results} = response;
    if(nrOfFailedTransactions){
        const {errorMessage, errorCode} = results[0];
        return {
            isError: nrOfFailedTransactions,
            responseMessage: {
                errorMessage,
                errorCode
            }
        }
    }
    return {
        isError: nrOfFailedTransactions,
    }
}

export const ContentDetails = (results: any[]) => {
    const noOfOrders = results.length;
    const noOfCompleted = results.filter((e: M3Restructered) => !e.isError).length;
    return {
        date: moment().format('MM/DD/YYYY'),
        startTime: Date.now().toString(),
        endTime: Date.now().toString(),
        noOfOrders,
        noOfCompleted,
        noOfFailed: noOfOrders - noOfCompleted
    }
}