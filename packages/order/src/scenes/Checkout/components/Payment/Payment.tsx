import type { FC } from "react";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Grid,
  Fieldset,
  Title,
  Select,
  Button,
} from "@mantine/core";
import { getYears, months } from "./expiration";

interface PaymentProps {
  onSubmit: (values: {
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvc: string;
  }) => void;
}

const Payment: FC<PaymentProps> = ({ onSubmit }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvc: "",
    },
  });

  return (
    <Fieldset variant="filled">
      <Title order={2}>Payment</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              mt="md"
              label="Zip"
              placeholder="Zip"
              key={form.key("zip")}
              {...form.getInputProps("zip")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 4 }}>
            <Select
              mt="md"
              label="Expiration Month"
              placeholder="Expiration Month"
              data={months}
              key={form.key("expirationMonth")}
              {...form.getInputProps("expirationMonth")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 4 }}>
            <Select
              mt="md"
              label="Expiration Year"
              placeholder="Expiration Year"
              data={getYears(5).map(String)}
              key={form.key("expirationMonth")}
              {...form.getInputProps("expirationMonth")}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 4 }}>
            <TextInput
              mt="md"
              label="CVC"
              placeholder="CVC"
              key={form.key("cvc")}
              {...form.getInputProps("cvc")}
            />
          </Grid.Col>
        </Grid>
        <Button mt="md" type="submit">
          Purchase
        </Button>
      </form>
    </Fieldset>
  );
};

export default Payment;
