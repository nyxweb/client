export default interface Resource {
  group: number;
  id: number;
  level: number;
  value?: number;
  [key: string]: any;
}
