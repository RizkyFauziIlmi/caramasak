import { Button, ListItem, UnorderedList } from "@chakra-ui/react"
import Link from "next/link"

export default function Kategori({ datas }) {
    return (
        <UnorderedList spacing={2} pl={"3rem"} pt={'2rem'}>
            {datas?.results.map((result, index) => {
                return(
                    <ListItem key={index}>
                        <Link href={`/kategori/${result.key}`}>
                            <Button variant={'link'}>{result.category}</Button>
                        </Link>
                    </ListItem>
                )
            })}
        </UnorderedList>
    )
}

export async function getStaticProps() {
    const response = await fetch("https://resep-api-theta.vercel.app/api/category/recipes")
    const data = await response.json()

    return {
        props: {
            datas: data
        }
    }
}