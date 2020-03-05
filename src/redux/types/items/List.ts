export default interface ItemsList {
  [key: string]: {
    title: string;
    items: {
      [key: string]: {
        name: string;
        x: number;
        y: number;
        options: {
          excellent: number;
          additional: string;
          ancient?: boolean;
        };
        class: number[];
      };
    };
  };
}
