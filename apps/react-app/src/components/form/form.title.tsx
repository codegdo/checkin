interface FormTitleProps {
  title?: string;
  description?: string;
}

export function FormTitle({ title, description }: FormTitleProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
