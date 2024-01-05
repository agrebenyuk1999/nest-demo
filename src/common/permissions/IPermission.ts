export default interface IPermission {
  group: string;
  permissions: {
    access?: string;
    create?: string;
    update?: string;
    delete?: string;
  };
}
