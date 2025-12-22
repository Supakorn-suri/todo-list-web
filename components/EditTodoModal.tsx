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
import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { Todo } from "@/api/todoApi";
import { useTodos } from "@/context/TodoContext";

interface EditTodoModalProp extends ModalBaseProps {
  todo: Todo;
}

export const EditTodoModal = ({
  todo,
  opened,
  onClose,
  ...rest
}: EditTodoModalProp) => {
  const { updateTodo } = useTodos();

  const form = useForm({
    initialValues: {
      title: todo?.title ?? "",
      content: todo?.content ?? "",
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
    },
  });

  useEffect(() => {
    if (todo) {
      form.setValues({
        title: todo.title,
        content: todo.content,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!todo) return;

    updateTodo(todo.id, values.title, values.content);

    onClose();

    notifications.show({
      title: "Updated successfully",
      message: undefined,
      color: "teal",
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Todo" {...rest}>
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
            <Button
              radius="md"
              variant="outline"
              color="red"
              onClick={modals.closeAll}
            >
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
