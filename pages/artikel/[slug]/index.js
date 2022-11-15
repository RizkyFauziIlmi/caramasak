import { UnorderedList, ListItem, Button } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ArtikelDetail({ datas }) {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Head>
                <title>{`Artikel | ${slug}`}</title>    
            </Head>        
            <UnorderedList spacing={2} pl={"3rem"} pb={'1rem'} pt={'2rem'} overflowX={'auto'}>
                {datas?.results.map((result, index) => {
                    return(
                        <ListItem key={index}>
                            <Link href={`/artikel/${slug}/${result.key}`}>
                                <Button variant={'link'}>{result.key}</Button>
                            </Link>
                        </ListItem>
                    )
                })}
            </UnorderedList>
        </>
    )
}

export async function getStaticPaths() {
    const response = await fetch("https://resep-api-theta.vercel.app/api/category/article")
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
    const response = await fetch(`https://resep-api-theta.vercel.app/api/category/article/${params.slug}`)
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}