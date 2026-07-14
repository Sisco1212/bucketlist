import LogoutButton from "@/components/ui/LogoutButton"
import WishForm from "@/components/ui/WishForm"
import WishList from "@/components/ui/WishList";
import { getWishes } from "@/lib/queries/wishes";

const BucketPage = async () => {
  const wishes = await getWishes();

  return (
    <div>
     <h1 className="text-3xl font-bold">BucketPage</h1>
     <h1 className="text-2xl font-bold">Create a Wish</h1>

<WishForm />

<h2 className="text-2xl font-bold mt-8">
        My Wishes
      </h2>

  <WishList wishes={wishes} />


        <LogoutButton />
    </div>
  )
}

export default BucketPage