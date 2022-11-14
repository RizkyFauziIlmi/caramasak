import { Grid, GridItem } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Head from "next/head"
import Card from "../components/Card"

export default function Home({ datas }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} p={'2rem'} gap={'1rem'} height={'100vh'} overflowY={'auto'}>
        {datas.results.map((result, index) => {
          return (
            <GridItem key={index}>
              <Card data={result}/>
            </GridItem>
          )
        })}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
  const response = await fetch("https://resep-api-theta.vercel.app/api/recipes")
  const data = await response.json()

  return {
    props: {
      datas: data
    }
  }
}
