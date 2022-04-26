import { Heading, Text } from '@chakra-ui/react'

export default function Header() {
    return (
        <header style={{ marginBottom: "1rem" }}>
            <Heading as="h1" size="xl">Tasklist</Heading>
            <Text fontSize='md'>Next + GraphQL</Text>
        </header>
    )
}