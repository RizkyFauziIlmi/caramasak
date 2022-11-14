import { Flex, Heading, Image, Text, Avatar, Icon, UnorderedList, ListItem, Tooltip, OrderedList } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { SiCodechef } from 'react-icons/si'
import { RiTimerLine } from 'react-icons/ri'
import { GiKnifeFork } from 'react-icons/gi'

export default function Resep({ datas }) {
    const router = useRouter()
    const { slug } = router.query


    return (
        <>
            <Head>
                <title>{slug.toUpperCase()}</title>    
            </Head>        
            <Flex overflowY={'auto'} height={'100vh'} justifyContent={'center'} p={'1rem'} width={'100%'}>
                <Flex width={'80%'} flexDir={'column'} gap={'1rem'}>
                    <Heading textAlign={'center'} size={'lg'} p={'0.5rem'}>{datas.results.title}</Heading>
                    <Image backgroundSize={'cover'} width={'100%'} borderRadius={'0.5rem'} boxShadow={'dark-lg'} src={datas.results.thumb} alt={datas.results.title} />
                    <Flex justifyContent={'space-between'} p={'1rem'}>
                        <Flex alignItems={'center'} gap={'0.3rem'} >
                            <Avatar name={datas.results.author.user} />
                            <Flex flexDir={'column'}>
                                <Text>{datas.results.author.user}</Text>
                                <Text>Di posting : {datas.results.author.datePublished}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Heading size={'md'}>Deskripsi</Heading>
                    <Text pb={'1rem'}>{datas.results.desc}</Text>
                    <Heading size={'md'}>Keterangan</Heading>
                    <Flex flexDir={'column'} gap={'0.5rem'} pb={'1rem'}>
                        <Flex alignItems={'center'}>
                            <Icon as={SiCodechef} boxSize={8} />
                            <Text>Tingkat Kesulitan : {datas.results.difficulty}</Text>
                        </Flex>
                        <Flex alignItems={'center'}>
                            <Icon as={RiTimerLine} boxSize={8} />
                            <Text>Waktu Yang Dibutuhkan : {datas.results.times}</Text>
                        </Flex>
                        <Flex alignItems={'center'}>
                            <Icon as={GiKnifeFork} boxSize={8} />
                            <Text>Porsi : {datas.results.servings}</Text>
                        </Flex>
                    </Flex>
                    <Heading size={'md'}>Bahan & Alat</Heading>
                    <UnorderedList pb={'1rem'}>
                        {datas.results.ingredient.map((value, index) => {
                            return(
                                <ListItem key={index}>{value}</ListItem>
                            )
                        })}
                        {datas.results.needItem.map((value, index) => {
                            return(
                                <ListItem key={index}>
                                    <Tooltip closeOnClick={false} placement="top-start" hasArrow label={<Image src={value.thumb_item} alt={value.item_name}/>}>
                                        <Text>{value.item_name}</Text>    
                                    </Tooltip>
                                </ListItem>
                            )
                        })}
                    </UnorderedList>
                    <Heading size={'md'}>Cara Membuat</Heading>
                    <OrderedList pb={'1rem'}>
                        {datas.results.step.map((value, index) => {
                            return(
                                <ListItem key={index}>{value.replace("1", "").replace("2", "").replace("3", "").replace("4", "")}</ListItem>
                            )
                        })}
                    </OrderedList>
                </Flex>
            </Flex>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: "cara-membuat-donat" } }],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://resep-api-theta.vercel.app/api/recipe/${params.slug}`)
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}