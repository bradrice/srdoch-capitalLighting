export interface Control {
  id: string,
  inputType: string,
  label: string,
  name: string,
  value: string,
  level: number,
  selected?: boolean
}

export interface levelControl {
  name: string;
  level: number;
  formControl: string;
}

export interface Template {
  id: string,
  template: string,
  heading?: string,
  subhead?: string,
  control: levelControl[],
}

export interface TemplateProps {
  data: Template | undefined
}

export interface RadioButtonCallbackProps {
  val: string;
  level: number;
}

export interface SubControl {
  level: number;
  id: string;
  label: string;
  control: Control[];
}
