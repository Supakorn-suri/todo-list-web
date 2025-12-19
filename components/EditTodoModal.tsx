import { Todo } from "@/api/todoApi";
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

interface EditTodoModalProp extends ModalBaseProps {
  todo: Todo;
}

export const EditTodoModal = ({
  todo,
  opened,
  onClose,
  ...rest
}: EditTodoModalProp) => {
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
  }, [todo]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!todo) return;

    // TODO : update todo context + toast
    console.log({
      ...todo,
      title: values.title.trim(),
      content: values.content.trim(),
    });

    onClose();
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
              Create
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
