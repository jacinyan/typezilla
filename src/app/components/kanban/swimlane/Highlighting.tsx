import React from "react";

const Highlighting = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) return <>{name}</>;

  const arr = name.split(keyword);
  return (
    <>
      {
        //possibly same strings with the array items, thus index as the key
        arr.map((str, index) => (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#257afd" }}>{keyword}</span>
            )}
          </span>
        ))
      }
    </>
  );
};

export default Highlighting;
