import { UnorderedList, ListItem, Button } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Artikel({ datas }) {
    return (
        <>
            <Head>
                <title>Artikel</title>
            </Head>
            <UnorderedList spacing={2} pl={"3rem"} pt={'2rem'}>
                {datas?.results.map((result, index) => {
                    return(
                        <ListItem key={index}>
                            <Link href={`/artikel/${result.key}`}>
                                <Button variant={'link'}>{result.title}</Button>
                            </Link>
                        </ListItem>
                    )
                })}
            </UnorderedList>
        </>
    )
}

export async function getStaticProps() {
    const respone = await fetch("https://resep-api-theta.vercel.app/api/category/article")
    const data = await respone.json()

    return {
        props: {
            datas: data
        }
    }
}