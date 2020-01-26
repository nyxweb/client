export interface Input {
  type: string;
  placeholder: string;
  value: string;
  change: Function;
}

export interface Button {
  type?: 'button' | 'submit' | 'reset' | undefined;
  looks?: 'basic' | 'default' | 'primary' | undefined;
  value: string;
}
