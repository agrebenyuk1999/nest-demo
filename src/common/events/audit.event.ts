export class AuditEvent {
  constructor(
    public readonly model: string,
    public readonly userId: number,
    public readonly action: string,
    public readonly data: any,
    public readonly originalData: any = null,
  ) {}
}
