import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api"
import queryClient from "../config/queryClient";

const UserMenu = () => {

    const navigate = useNavigate();
    const {mutate: signOut} = useMutation({
        mutationFn: logout,
        onSettled: () => {
            queryClient.clear();
            navigate("/login", { replace: true });
        }
    })
    return (
    <Menu isLazy placement="right-start">
      <MenuButton position="absolute" left="1.5rem" bottom="1.5rem">
        <Avatar src="#" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
    )
}

export default UserMenu;