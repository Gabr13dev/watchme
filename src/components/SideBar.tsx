import { Button } from "./Button";

interface sidebarProps {
  genre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
  handleClickButton: (id: number) => void,
  backFuntion: () => void,
  selectedGenreId: number
}

export function SideBar({genre, handleClickButton, backFuntion, selectedGenreId}: sidebarProps) {
  return (
    <Button
      id={String(genre.id)}
      title={genre.title}
      iconName={genre.name}
      onClick={() => { handleClickButton(genre.id); backFuntion() } }
      selected={selectedGenreId === genre.id}
    />
  )
}