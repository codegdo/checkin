import { ILabel } from "./types";

interface IProps extends ILabel { }

export function Label({ className, title = '', description = '', styles }: IProps) {
  return <>
    {
      (title || description) &&
      <div>
        {title && <label className='label' style={styles?.title}>{title}</label>}
        {description && <span className='description' style={styles?.description}>{description}</span>}
      </div>
    }
  </>
}