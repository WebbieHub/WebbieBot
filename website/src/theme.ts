import { extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
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


