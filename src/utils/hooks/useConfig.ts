import { createContext, useContext } from 'react'
import { SIZES } from '../../constants/theme.constant'

const defaultConfig = {
    themeColor: 'indigo',
    direction: 'ltr',
    mode: 'light',
    locale: 'en',
    primaryColorLevel: 600,
    cardBordered: false,
    controlSize: SIZES.MD,
    navMode: 'light'
}

const ConfigContext = createContext(defaultConfig)

const ConfigProvider = ConfigContext.Provider

const ConfigConsumer = ConfigContext.Consumer

const useConfig = () => {
    return useContext(ConfigContext)
}

export { ConfigContext, ConfigConsumer, useConfig, defaultConfig }

export default ConfigProvider