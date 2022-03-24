import { extendTheme} from "@chakra-ui/react";

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
    }

})

export default theme;


