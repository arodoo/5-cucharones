import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { SearchBar, ListItem, Avatar, Icon } from "react-native-elements";
import { Loading } from "../components/Shared";

export function SearchScreen() {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    return (
        <>
            <SearchBar placeholder="Buscar" lightTheme round
                onChangeText={(text) => setSearch(text)}
                value={search}
            />
            {!search ? <Loading show text="Cargando"></Loading> : <ScrollView>
                <ListItem>
                    <Avatar source={{ uri: "https://randomuser.me/api/port 0.2/nat=us" }} />
                    <ListItem.Content>
                        <ListItem.Title>Nombre</ListItem.Title>
                        <ListItem.Subtitle>Descripción</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </ScrollView>}
        </>
    );
}
