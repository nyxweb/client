export interface Input {
  type: string;
  placeholder: string;
  value: string;
  change: Function;
}

export interface Button {
  value: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  looks?: 'basic' | 'default' | 'primary' | 'secondary' | undefined;
  loading?: boolean;
}
