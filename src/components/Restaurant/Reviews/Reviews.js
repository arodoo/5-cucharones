import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, AirbnbRating, ListItem, Avatar } from "react-native-elements";
import {
    onSnapshot,
    collection,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { map } from "lodash";
import { DateTime } from "luxon";
import { Loading } from "../../Shared";
import { db } from "../../../utils";
import { styles } from "./Reviews.styles";
import "intl";
import "intl/locale-data/jsonp/es";
import { set } from "firebase/database";

export function Reviews(props) {
    const { idRestaurant } = props;
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, "reviews"),
            where("idRestaurant", "==", idRestaurant),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs);
        });

        // Corrección aquí: función de flecha para la función de limpieza
        return () => {
            unsubscribe();
            setReviews(null);
        };
    }, [idRestaurant]);

    if (!reviews) return <Loading show text="Cargando" />;

    return (
        <View style={styles.content}>
            {map(reviews, (review) => {
                const data = review.data();
                const createReview = new Date(data.createdAt.seconds * 1000);

                return (
                    <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
                        <Avatar source={{ uri: data.avatar }} size={50} rounded />
                        <ListItem.Content>
                            <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
                            <View style={styles.subtitle}>
                                <Text style={styles.comment}>{data.comment}</Text>
                                <View style={styles.contentRatingDate}>
                                    <AirbnbRating
                                        defaultRating={data.rating}
                                        showRating={false}
                                        size={15}
                                        isDisabled
                                        starContainerStyle={styles.starContainer}
                                    />
                                    <Text style={styles.date}>
                                        {DateTime.fromISO(createReview.toISOString()).toFormat(
                                            "yyyy/LL/dd - hh:mm"
                                        )}
                                    </Text>
                                </View>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </View>
    );
}