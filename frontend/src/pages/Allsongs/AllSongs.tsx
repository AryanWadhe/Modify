import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import SectionGrid from "../home/components/SectionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";

const AllSongs = () => {
  const { fetchSongs, songs, isLoading } = useMusicStore();

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <ScrollArea className="container mx-auto py-8 h-[calc(100vh-100px)]">
      <SectionGrid songs={songs} title="All Songs" isLoading={isLoading} />
    </ScrollArea>
  );
};

export default AllSongs;
