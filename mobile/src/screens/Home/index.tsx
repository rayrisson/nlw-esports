import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch("http://192.168.0.13:3000/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
};
