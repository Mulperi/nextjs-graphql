import { AddIcon } from "@chakra-ui/icons";
import { Heading, HStack, IconButton, Tag } from "@chakra-ui/react";

export default function UserTags(props: any) {

    return (
        <section style={{ width: "100%" }}>
            <Heading as="h3" size="l">Users</Heading>
            <HStack align='center' justify="start" width="100%">
                <IconButton size="xs" aria-label='Add to friends' icon={<AddIcon />} onClick={() => {
                    props.openCreateUserDialog()
                }} />

                {props.users.map((user: any) => (
                    <Tag as="button"
                        key={user?.id}
                        onClick={() => {
                            props.changeTags(user.id)
                        }}
                        colorScheme={props.selectedTags.includes(user?.id) ? 'green' : 'gray'}
                    >{user?.name}</Tag>))}
            </HStack>
        </section>
    )

}