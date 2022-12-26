export interface Controls {
  id: string,
  inputType: string,
  label: string,
  name: string,
  value?: string,
  subcontrol?: Controls[]
}

export interface Template {
  id: string,
  template: string,
  heading?: string,
  subhead?: string,
  controls: Controls[]
}

export interface TemplateProps {
  data: Template | undefined
}
