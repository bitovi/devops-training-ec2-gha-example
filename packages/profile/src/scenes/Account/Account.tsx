import type { Profile } from "shared-types";

import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Button,
  Group,
  TextInput,
  Stack,
} from "@mantine/core";

import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const fakeUser = {
  avatar: "https://via.placeholder.com/100",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+123456789",
  address: "123 Main St, Anytown, USA",
};

const Account: Profile.Account = () => {
  const [, setIsLoggedIn] = useLocalStorage<boolean>({ key: "logged-in" });
  const navigate = useNavigate();

  return (
    <Container>
      <Title order={1} mb="xl">
        Account Details
      </Title>
      <Grid>
        <Grid.Col span={3}>
          <Card shadow="sm" padding="lg">
            <Image
              src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${fakeUser.name}`}
              alt="Avatar"
              radius="md"
              mx="auto"
              mb="md"
            />
            <Title order={3}>{fakeUser.name}</Title>
            <Text>{fakeUser.email}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={9}>
          <Card shadow="sm" padding="lg">
            <Title order={4} mb="md">
              Contact Information
            </Title>
            <Stack>
              <TextInput label="Email" value={fakeUser.email} readOnly />
              <TextInput label="Phone" value={fakeUser.phone} readOnly />
              <TextInput label="Address" value={fakeUser.address} readOnly />
            </Stack>
            <Title order={4} mt="lg" mb="md">
              Account Settings
            </Title>
            <Stack>
              <TextInput label="Username" value={fakeUser.name} readOnly />
              <TextInput label="Password" value="********" readOnly />
            </Stack>
            <Group mt="lg">
              <Button
                onClick={() => {
                  setIsLoggedIn(false);
                  navigate("/");
                }}
              >
                Log Out
              </Button>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Account;
