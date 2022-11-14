import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react"
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true)
      }
    }

    const handleComplete = (url) => {
      if (url === router.asPath) {
        setTimeout(() => {
          setLoading(false)
        }, 1)
      }
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
    }
  }, [router.asPath, router.events])

  if (loading) {
    return (
      <ChakraProvider>
        <Flex flexDir={['column', 'column', 'row', 'row']}>
          <Navbar />
          <Flex width={"100%"} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Spinner size={'xl'} />
          </Flex>
        </Flex>
      </ChakraProvider>
    )
  } else {
    return (
      <ChakraProvider>
        <Flex flexDir={['column', 'column', 'row', 'row']}>
          <Navbar />
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    )
  }
}

export default MyApp
