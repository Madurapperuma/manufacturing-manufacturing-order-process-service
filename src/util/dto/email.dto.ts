export class Email {
    from?: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    template: string;
    attachments?: Attachment[];
  }
  
  export class Attachment {
    filename: string;
    href?: string;
    path?: string;
    content?: string;
    encoding?: string;
  }
  