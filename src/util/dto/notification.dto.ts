export class NotificationRoot {
    userId: string;
    data: Notification;
  }
  
  export class Notification {
    priority: 'HIGH' | 'NORMAL' | 'LOW' = 'NORMAL';
    type: 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR' = 'INFO';
    deleteWarning = false;
    moveToInbox = false;
    data: any | NotificationMessage;
  }
  
  export class NotificationMessage {
    message: string;
    link: string;
    type: string;
  }
  