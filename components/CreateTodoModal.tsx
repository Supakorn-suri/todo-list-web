"use client";

import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Group,
  Button,
  ModalBaseProps,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useTodos } from "@/context/TodoContext";

export const CreateTodoModal = ({
  opened,
  onClose,
  ...rest
}: ModalBaseProps) => {
  const { addTodo } = useTodos();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },

    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    addTodo(values.title, values.content);

    notifications.show({
      title: "Created successfully",
      message: undefined,
      color: "teal",
    });

    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Todo" {...rest}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Content"
            placeholder="Content"
            autosize
            minRows={3}
            {...form.getInputProps("content")}
          />
          <Group justify="flex-end" mt="md">
            <Button radius="md" variant="outline" color="red" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              radius="md"
              color="teal"
              disabled={!form.isValid()}
            >
              Confirm
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
