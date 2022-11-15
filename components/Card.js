import { Flex, Image, Heading, Text, Button, Badge } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { GiKnifeFork } from 'react-icons/gi'
import { RiTimerLine } from 'react-icons/ri'

export default function Card({ data }) {
    const router = useRouter()
    
    return (
        <Flex flexDir={'column'} gap={'0.5rem'} boxShadow={"dark-lg"} p={'1rem'}>
            <Image boxShadow={'lg'} src={data.thumb} borderRadius={'0.5rem'} alt={data.title} />
            {data.difficulty === "Mudah" ? <Badge width={'max-content'} colorScheme={'green'}>{data.difficulty}</Badge> : ""}
            {data.difficulty === "Cukup Rumit" ? <Badge width={'max-content'} colorScheme={'red'}>{data.difficulty}</Badge> : ""}
            <Heading size={'xs'} noOfLines={2}>{data.title}</Heading>
            <Flex justifyContent={'space-around'}>
                <Flex alignItems={'center'} gap={'0.3rem'}>
                    <RiTimerLine />
                    <Text>{data.times}</Text>
                </Flex>
                <Flex alignItems={'center'} gap={'0.3rem'}>
                    <GiKnifeFork />
                    <Text>{data.serving}</Text>
                </Flex>
            </Flex>
            <Link href={`/resep/${data.key}`} style={{ width: "100%" }}>
                <Button colorScheme={'green'} width={"100%"}>Liat Resep</Button>
            </Link>
        </Flex>
    )
}