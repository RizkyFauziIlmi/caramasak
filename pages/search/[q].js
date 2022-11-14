import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import Card from "../../components/Card"

export default function Search({ datas }) {
    const router = useRouter()
    const { q } = router.query

    return (
        <>
            <Head>
                <title>Search | {q}</title>
            </Head>
            <Flex width={'100%'} flexDir={'column'} alignItems={'center'} height={'100vh'} overflowY={'auto'}>
                <Heading pt={'2rem'} size={["sm", "sm", "lg", "lg"]}>Hasil Pencarian Untuk {`'${q}'`} ({datas?.results.length})</Heading>
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} p={'2rem'} gap={'1rem'}>
                    {datas.results.map((result, index) => {
                        return (
                            <GridItem key={index}>
                                <Card data={result} />
                            </GridItem>
                        )
                    })}
                </Grid>
            </Flex>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { q: "coto" } }
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = fetch(`https://resep-api-theta.vercel.app/api/search/?q=${params.q}`)
    const data = await (await response).json()

    return {
        props: {
            datas: data
        }
    }
}