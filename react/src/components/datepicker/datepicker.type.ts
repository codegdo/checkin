export type DatePickerProps = {

}

export type DatePickerContextProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<any>>
} & DatePickerProps | undefined