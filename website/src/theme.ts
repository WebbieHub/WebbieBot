import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    useSystemColorMode: true
}


const theme = extendTheme({
    fonts: {
        body: "DM Sans, sans-serif",
        heading: 'DM Sans, sans-serif'
    },
    components: {
        Progress: {
            baseStyle: {
                filledTrack: {
                    bg: '#44337A'
                }
            }
        }
    },
    config

})

export default theme;


