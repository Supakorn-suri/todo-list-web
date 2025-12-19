import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Group,
  Button,
  ModalBaseProps,
} from "@mantine/core";

export const CreateTodoModal = ({
  opened,
  onClose,
  ...rest
}: ModalBaseProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Create Todo" {...rest}>
      <Stack gap={16}>
        <TextInput label="Title" placeholder="Title" />
        <Textarea label="Content" placeholder="Content" /> 
        <Group justify="flex-end" mt="md">
          <Button radius="md" variant="outline" color='red'>
            Cancel
          </Button>
          <Button type="submit" radius="md" color='teal'>
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};