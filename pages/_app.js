import { ChakraProvider, Flex } from "@chakra-ui/react"
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Flex flexDir={['column', 'column', 'row', 'row']}>
        <Navbar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp
