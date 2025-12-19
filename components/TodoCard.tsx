import {
  ActionIcon,
  Card,
  CardProps,
  Chip,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconTrash, IconEdit, IconCircleFilled } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

import { Todo } from "@/api/todoApi";
import { EditTodoModal } from "./EditTodoModal";
import { useDisclosure } from "@mantine/hooks";

interface TodoCardProps extends CardProps {
  todo: Todo;
  onCompletedChange?: (checked: boolean) => void;
  onClickCard?: () => void;
}

export const TodoCard = ({
  todo,
  onCompletedChange,
  onClickCard,
  ...rest
}: TodoCardProps) => {
  const { id, title, content, completed } = todo;
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const openedDeleteModal = () =>
    modals.openConfirmModal({
      size: "md",
      title: "Please confirm your action",
      children: (
        <Text size="md" c="white">
          Are you sure you want to delete this todo?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      cancelProps: { color: "gray", variant: "outline" },
      onCancel: () => modals.closeAll,
      onConfirm: () => modals.closeAll,
    });

  return (
    <Card
      key={id}
      miw={300}
      w="100%"
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        background: "#111111",
        borderColor: "#1A202A",
        cursor: "pointer",
      }}
      onClick={onClickCard}
      {...rest}
    >
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Title
            order={4}
            c="white"
            lineClamp={1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {title}
          </Title>
          <Group gap={8}>
            <ActionIcon
              variant="subtle"
              size="sm"
              radius="sm"
              color="#7F3232"
              onClick={(e) => {
                e.stopPropagation();
                openedDeleteModal();
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              size="sm"
              radius="sm"
              color="yellow"
              onClick={(e) => {
                e.stopPropagation();
                openEditModal();
              }}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Text c="gray.6" lineClamp={3} size="sm">
          {content}
        </Text>
        <Group justify="flex-end">
          <Chip
            checked={completed}
            onChange={(checked) => onCompletedChange?.(checked)}
            variant="light"
            color={completed ? "teal" : "gray"}
            styles={{
              label: {
                backgroundColor: completed ? undefined : "#2D2D2D80",
                paddingInline: 12,
                color: completed ? undefined : "white",
              },
            }}
          >
            <Group gap={6} p={0}>
              {!completed && <IconCircleFilled color="#FBD743" size={10} />}
              {completed ? "Done" : "Todo"}
            </Group>
          </Chip>
        </Group>

        <EditTodoModal
          todo={todo}
          opened={openedEditModal}
          onClose={closeEditModal}
        />
      </Stack>
    </Card>
  );
};
