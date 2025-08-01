import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Key } from "react";
import { Badge } from "./ui/badge";

type pokemonList = {
  name: string;
  url: URL;
};

const PokemonTable = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const pokemonList = await response.json();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Pokemon Name</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>Abilities</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemonList.results.map(
          async ({ name, url }: pokemonList, index: Key) => {
            const pokemonDataResp = await fetch(url);
            const pokemonData = await pokemonDataResp.json();

            type typeDetail = {
              name: string;
              url: URL;
            };
            type pokType = {
              type: typeDetail;
              slot: number;
            };

            type abilityDetail = {
              name: string;
              url: URL;
            };
            type pokAbility = {
              ability: abilityDetail;
              slot: number;
            };

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>
                  {pokemonData.types.map((type: pokType, index: Key) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-500 text-white dark:bg-blue-600 mr-3"
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  {pokemonData.abilities.map(
                    async (ability: pokAbility, index: Key) => {
                      const pokABilityResp = await fetch(ability.ability.url);
                      const pokAbility = await pokABilityResp.json();
                      const effect = pokAbility.effect_entries[0].effect;
                      return (
                        <Dialog key={index}>
                          <DialogTrigger asChild>
                            <Badge
                              variant="secondary"
                              className="bg-green-500 text-white dark:bg-green-600 mr-3"
                            >
                              {ability.ability.name}
                            </Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{ability.ability.name}</DialogTitle>
                              <DialogDescription>{effect}</DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      );
                    }
                  )}
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};

export default PokemonTable;
