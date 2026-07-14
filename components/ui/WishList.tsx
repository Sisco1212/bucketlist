import type { Wish } from "@/types/wish";

import WishCard from "./WishCard";

type WishListProps = {
  wishes: Wish[];
};

const WishList = ({ wishes }: WishListProps) => {
  if (wishes.length === 0) {
    return (
      <p>
        Your bucket list is empty.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {wishes.map((wish) => (
        <WishCard
          key={wish.id}
          wish={wish}
        />
      ))}
    </div>
  );
};

export default WishList;