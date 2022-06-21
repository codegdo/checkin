export type FormProps = {
  className?: string;
  onSubmit?: (values: Record<string, string>) => Promise<void>;
}