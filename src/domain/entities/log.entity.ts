
export enum  LogSeverityLevel {
  low= 'low',
  medium = 'medium',
  high = 'high'
}


export interface LogEntityProps {
  message: string,
  level: LogSeverityLevel,
  origin: string;
  createdAt?: Date;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;


  constructor(options: LogEntityProps ) {
    const { message, level, origin, createdAt } = options
    this.message = message;
    this.level = level;
    this.createdAt = createdAt ? createdAt : new Date();
    this.origin = origin
  }

  static fromJson = (json:string):LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    if (!message) {
      throw new Error('Message is required');
    }
    if (!level) {
      throw new Error('Level is required');
    }

    const log = new LogEntity({ message, level, origin, createdAt });
    return log;
  }
}