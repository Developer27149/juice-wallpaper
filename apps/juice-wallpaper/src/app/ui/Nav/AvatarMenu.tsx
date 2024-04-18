'use client';

import { Avatar, Menu, Text, rem } from '@mantine/core';
// import Image from 'next/image';

interface AvatarMenuProps {
  avatar: string;
}
export default function AvatarMenu({ avatar }: AvatarMenuProps) {
  return (
    <Menu shadow="md" width={200} trigger="click-hover">
      <Menu.Target>
        <li>
          <Avatar src={avatar} alt="avatar" />
        </li>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <i
              className="i-material-symbols-settings-applications-outline-rounded"
              style={{ width: rem(14), height: rem(14) }}
            />
          }
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <i
              className="i-material-symbols-business-messages"
              style={{ width: rem(14), height: rem(14) }}
            />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
        // leftSection={
        //   <IconPhoto style={{ width: rem(14), height: rem(14) }} />
        // }
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          // leftSection={
          //   <IconSearch style={{ width: rem(14), height: rem(14) }} />
          // }
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
        // leftSection={
        //   <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
        // }
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          // leftSection={
          //   <IconTrash style={{ width: rem(14), height: rem(14) }} />
          // }
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
