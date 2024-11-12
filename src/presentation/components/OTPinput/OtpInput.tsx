import { useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

interface OtpInputProps {
    handleConfirm: ( code: string ) => string
}

const OtpInput = ( props: OtpInputProps ) => {

  const [value, setValue] = useState<string>('')

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const handleComplete = (finalValue: string) => {
    console.log(finalValue);
    props.handleConfirm( finalValue )
  }

  return (
    <MuiOtpInput
      value={value}
      onChange={handleChange}
      onComplete={handleComplete}
      length={6}
      autoFocus
      validateChar={(character: string, index: number) => true}
    />
  )
}

export default OtpInput