import { Flex, Heading, IconButton, Button, Input, InputGroup, InputRightElement, useDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { BsSearch, BsSun, BsMoon } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Navbar() {
    const router = useRouter()
    const [input, setInput] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const searchRef = useRef()
    const [onSearch, setOnSearch] = useState(false)
    const { toggleColorMode, colorMode } = useColorMode()

    useEffect(() => {
        const handleKeyboard = (event) => {
            if (event.key === "Enter") {
                setOnSearch(true)
                searchRef.current.click()
            }
        }
        const handleComplete = (url) => (url === router.asPath) && setOnSearch(false);

        router.events.on('routeChangeComplete', handleComplete)

        window.addEventListener("keydown", handleKeyboard)

        return () => {
            window.removeEventListener("keydown", handleKeyboard)
            router.events.off('routeChangeComplete', handleComplete)
        }

    }, [router.asPath, router.events])


    return (
        <>
            <Flex display={["none", "none", "flex", "flex"]} boxShadow={'dark-lg'} p={'1rem'} width={'20%'} flexDir={'column'} height={'100vh'}>
                <Link href={"/"} style={{ alignSelf: "center" }}>
                    <Heading size={'lg'} p={'1rem'}>CaraMasak</Heading>
                </Link>
                <InputGroup>
                    <Input onChange={(e) => setInput(e.target.value)} />
                    <InputRightElement>
                        <Link href={`/search/${input}`}>
                            <IconButton icon={<BsSearch />} ref={searchRef} />
                        </Link>
                    </InputRightElement>
                </InputGroup>
                <Flex flexDir={'column'} gap={'0.5rem'} pt={'2rem'}>
                    <Button variant={router.pathname === "/" ? 'solid' : 'ghost'} onClick={() => router.push('/')}>Home</Button>
                    <Button variant={router.pathname.includes("kategori") ? 'solid' : 'ghost'} onClick={() => router.push('/kategori')}>Kategori</Button>
                    <Button variant={router.pathname.includes("artikel") ? 'solid' : 'ghost'} onClick={() => router.push('/artikel')}>Artikel</Button>
                    <IconButton onClick={toggleColorMode} icon={colorMode === "dark" ? <BsSun /> : <BsMoon />} variant={'outline'} />
                </Flex>
            </Flex>
            <Flex justifyContent={'space-between'} gap={'0.5rem'} alignItems={'center'} display={["flex", "flex", "none", "none"]} p={'1rem'} boxShadow={'dark-lg'}>
                <Link href={"/"} style={{ alignSelf: "center" }}>
                    <Heading size={'sm'}>CaraMasak</Heading>
                </Link>
                <InputGroup>
                    <Input onChange={(e) => setInput(e.target.value)} />
                    <InputRightElement>
                        <Link href={`/search/${input}`}>
                            <IconButton icon={<BsSearch />} isLoading={onSearch ? true : false} onClick={() => setOnSearch(true)} />
                        </Link>
                    </InputRightElement>
                </InputGroup>
                <IconButton icon={<AiOutlineMenu />} ref={btnRef} onClick={onOpen} />
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    size={'xs'}
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <Flex flexDir={'column'} gap={'0.5rem'} pt={'2rem'}>
                                <Button variant={router.pathname === "/" ? 'solid' : 'ghost'} onClick={() => router.push('/')}>Home</Button>
                                <Button variant={router.pathname.includes("kategori") ? 'solid' : 'ghost'} onClick={() => router.push('/kategori')}>Kategori</Button>
                                <Button variant={router.pathname.includes("artikel") ? 'solid' : 'ghost'} onClick={() => router.push('/artikel')}>Artikel</Button>
                                <IconButton onClick={toggleColorMode} icon={colorMode === "dark" ? <BsSun /> : <BsMoon />} variant={'outline'} />
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </>
    )
}