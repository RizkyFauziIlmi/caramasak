import { Button, ListItem, UnorderedList } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function Kategori({ datas }) {
    const router = useRouter()

    return (
        <UnorderedList spacing={2} pl={"3rem"} pt={'2rem'}>
            {datas.results.map((result, index) => {
                return(
                    <ListItem key={index}>
                        <Button variant={'link'} onClick={() => router.push(`/kategori/${result.key}`)}>{result.category}</Button>
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