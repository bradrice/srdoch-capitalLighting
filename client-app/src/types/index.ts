export interface Control {
  id: string,
  inputType: string,
  label: string,
  name: string,
  value?: string,
  level: number,
}

export interface levelControl {
  name: string;
  level: number;
  formControl: Control[]
}

export interface Template {
  id: string,
  template: string,
  heading?: string,
  subhead?: string,
  control: levelControl[]
}

export interface TemplateProps {
  data: Template | undefined
}
