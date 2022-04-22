import { HStack, Tag } from "@chakra-ui/react";

export default function UserTags(props: any) {

    return (
        <HStack>
            {props.users.map((user: any) => (
                <Tag as="button"
                    key={user.id}
                    onClick={() => {
                        props.changeTags(user.id)
                    }}
                    colorScheme={props.selectedTags.includes(user.id) ? 'green' : 'gray'}
                >{user.name}</Tag>))}
        </HStack>

    )

}