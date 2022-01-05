export class M3Response {
    results!: M3Results[]
    wasTerminated!: boolean
    nrOfSuccessfullTransactions!: number;
    nrOfFailedTransactions!: number
}

class M3Results {
    transaction!: string
    errorMessage?: string
    errorType?: string
    errorCode?: string
    errorCfg?: string
    errorField?: string
}

export class M3Restructered {
    isError!: number
    responseMessage?: M3RestructeredMessage
}

class M3RestructeredMessage {
    errorMessage!: string
    errorCode!: string
}