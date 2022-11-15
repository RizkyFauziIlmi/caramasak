import { Avatar, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function IsiArtikel({ datas }) {
    const router = useRouter()
    const { key } = router.query

    return (
        <>
            <Head>
                <title>{key}</title>
            </Head>
            <Flex width={"100vw"} justifyContent={'center'} overflowY={'auto'} height={'100vh'}>
                <Flex flexDir={'column'} width={'80%'}>
                    <Heading size={['md', 'md', 'lg', 'lg']} p={'1rem'} textAlign={'center'}>{datas?.results.title}</Heading>
                    <Image boxShadow={'dark-lg'} borderRadius={"0.5rem"} src={datas?.results.thumb} alt={datas?.results.title} />
                    <Flex p={'1rem'} alignItems={'center'} gap={'0.5rem'}>
                        <Avatar name={datas?.results.author} />
                        <Flex flexDir={'column'}>
                            <Text>{datas?.results.author}</Text>
                            <Text>{datas?.results.date_published}</Text>
                        </Flex>
                    </Flex>
                    <Text pb={'0.5rem'}>{datas?.results.description}</Text>
                </Flex>
            </Flex>
        </>
    )

}

export async function getStaticPaths() {
    // const artikel = await fetch("https://resep-api-theta.vercel.app/api/category/article")
    // const dataArtikel = await artikel.json()

    // const paths = dataArtikel.results.map( async (result) => {
    //     const isiArtikel = await fetch(`https://resep-api-theta.vercel.app/api/category/article/${result.key}`)
    //     const dataIsiArtikel = await isiArtikel.json()
    //     dataIsiArtikel.results.map((value) => ({
    //         params: { slug: `${result.key}`, key: `${value.key}` }
    //     }))
    // })

    return {
        paths: [
            { params: { slug: "inspirasi-dapur" || null, key: "bukan-nasi-goreng-inilah-olahan-nasi-sisa-yang-bikin-hemat" || null } }
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://resep-api-theta.vercel.app/api/article/${params.slug}/${params.key}`)
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}