import PokemonTable from "@/components/pokemon-table";

export default async function Home() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Pokemons</h1>
        <PokemonTable />
      </div>
    </div>
  );
}
