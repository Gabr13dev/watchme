import { memo } from "react";

import { MovieCard } from "./MovieCard";

interface contentProps {
  movie: {
    id: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }
}

function ContentComponent(props: contentProps) {
  return (
    <MovieCard
      title={props.movie.Title} 
      poster={props.movie.Poster}
      runtime={props.movie.Runtime} 
      rating={props.movie.Ratings[0].Value} 
    />
  )
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.movie, nextProps.movie)
})