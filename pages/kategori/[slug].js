import { Grid, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import Card from "../../components/Card"

export default function KategoriDetail({ datas }) {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Head>
                <title>{`Kategori | ${slug?.replace("-", " ")}`}</title>
            </Head>
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} p={'2rem'} gap={'1rem'} height={'100vh'} overflowY={'auto'}>
                {datas?.results.map((result, index) => {
                    return (
                        <GridItem key={index}>
                            <Card data={result} />
                        </GridItem>
                    )
                })}
            </Grid>
        </>
    )
}

export async function getStaticPaths() {
    const response = await fetch("https://resep-api-theta.vercel.app/api/category/recipes") 
    const data = await response.json()
    const paths = data.results.map((result) => ({
        params : { slug: result.key }
    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://resep-api-theta.vercel.app/api/category/recipes/${params.slug}`)
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}