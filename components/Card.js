import { Flex, Image, Heading, Text, Button, Badge } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { GiKnifeFork } from 'react-icons/gi'
import { RiTimerLine } from 'react-icons/Ri'

export default function Card({ data }) {
    const router = useRouter()
    
    return (
        <Flex flexDir={'column'} gap={'0.5rem'} boxShadow={"dark-lg"} p={'1rem'}>
            <Image src={data.thumb} borderRadius={'0.5rem'} alt={data.title} />
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
            <Button colorScheme={'green'} onClick={() => router.push(`/resep/${data.key}`)}>Liat Resep</Button>
        </Flex>
    )
}