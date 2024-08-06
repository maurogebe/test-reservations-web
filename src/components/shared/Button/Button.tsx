import { Button as ButtonChakra, useStyleConfig } from "@chakra-ui/react"
import { useConfig } from "../../../utils/hooks/useConfig"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"

export const Button = (props: any) => {

	const { variant, children, text, size, color = '.', className, disabled, loading, active, danger, ...rest } = props

	const { themeColor, primaryColorLevel } = useSelector((state: RootState) => state.theme.state)

  const styles = useStyleConfig("Button", { variant });
  
	const splitedColor = color.split('.')

	const buttonColor = splitedColor[0] || themeColor
	const buttonColorLevel = splitedColor[0] || primaryColorLevel

  return (
    <ButtonChakra
      __css={styles}
      color='white'
      display='flex'
      alignItems='center'
      justifyContent='center'
      bg={`${buttonColor}.${buttonColorLevel}`}
      _hover={{ bg: `${buttonColor}.${buttonColorLevel + 100}` }}
      isLoading={loading}
      {...rest}
    >
      { text ?? children }
    </ButtonChakra>
  )
}