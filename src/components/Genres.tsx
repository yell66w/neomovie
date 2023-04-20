import React from "react";

interface Props {
  genres: { id: number; name: string }[];
}

const Genres = ({ genres }: Props) => {
  return (
    <>
      {!!genres?.length && (
        <ul className="flex flex-wrap gap-1">
          {genres?.map(({ id, name }, index) => (
            <li className="opacity-60 text-xs" key={id}>
              {name} {index !== genres.length - 1 ? ` / ` : ""}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Genres;
