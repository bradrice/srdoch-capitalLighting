export interface iControl {
  id: string,
  inputType: string,
  label: string,
  name: string,
  value: string,
  level: number,
  selected?: boolean,
  relation?: string
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
  control: iControl[];
}

export interface iAuditType {
  control: string[];
  heading: string;
  id: string;
  instruction?: string;
  subhead?: string;
  template: string;
  title: string;
}

export interface iRowControls {
  rowid: string;
  controls: iControl[];
}

export interface iControlRow {
  id: string;
  title: string;
}

export interface iRow {
  rowIndex: number;
  rowid: string;
  rowTitle: string;
  control: iControl[];
}
