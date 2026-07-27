"use client";
import { useState } from "react";
import type { Wish } from "@/types/wish";
import type { WishStatus } from "@/lib/constants/wish-status";
import { updateWishStatus, deleteWish, updateWish, shareWish  } from "@/actions/wishes";
import WishEditForm from "./WishEditForm";
import WishStatusSelect from "./WishStatusSelect";
import WishActions from "./WishActions";
import WishContent from "./WishContent";

type WishCardProps = {
  wish: Wish & {
    inspiredBy: string | null;
  };
};

const WishCard = ({ wish }: WishCardProps) => {

const [status, setStatus] = useState(wish.status);
const [ui, setUi] = useState({
  editing: false,
  updating: false,
  deleting: false,
});
const [title, setTitle] = useState(wish.title);

const [description, setDescription] = useState(
  wish.description ?? ""
);

const [isPublic, setIsPublic] = useState(wish.is_public);

const handleSave = async () => {
 setUi((prev) => ({
         ...prev,
         updating: true,
       }));
   
       try {
         const result = await updateWish({
           id: wish.id,
           title,
           description,
         });
   
         if (result.success) {
           setUi((prev) => ({
             ...prev,
             editing: false,
           }));
         }
       } finally {
         setUi((prev) => ({
           ...prev,
           updating: false,
         }));
       }
}

const handleCancel = () => { 
 setTitle(wish.title);
           setDescription(
             wish.description ?? ""
           );
   
           setUi((prev) => ({
             ...prev,
             editing: false,
           }));
}

const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => { 
 const newStatus = e.target.value as WishStatus;
        const previousStatus = status;
    
        setStatus(newStatus);
    
        setUi((prev) => ({
          ...prev,
          updating: true,
        }));
    
        try {
          await updateWishStatus(wish.id, newStatus);
        } catch {
      setStatus(previousStatus);
    } finally {
          setUi((prev) => ({
            ...prev,
            updating: false,
          }));
        }
}

const handleEdit = () => { 
  setUi((prev) => ({
      ...prev,
      editing: true,
    }))
}

const handleDelete = async () => { 
  const confirmed = window.confirm(
    "Are you sure you want to delete this wish?"
  );

  if (!confirmed) return;

  setUi((prev) => ({
    ...prev,
    deleting: true,
  }));

  try {
    await deleteWish(wish.id);
  } finally {
    setUi((prev) => ({
      ...prev,
      deleting: false,
    }));
  }
}

async function handleShare() {
  const nextValue = !isPublic;

  setIsPublic(nextValue);

  setUi((prev) => ({
    ...prev,
    updating: true,
  }));

  try {
    const result = await shareWish(
      wish.id,
      nextValue
    );

    if (!result.success) {
      setIsPublic(!nextValue);
    }
  } catch {
    setIsPublic(!nextValue);
  } finally {
    setUi((prev) => ({
      ...prev,
      updating: false,
    }));
  }
}

console.log(wish);

    return (
    <div className="border rounded-lg p-4 space-y-3">

      {!ui.editing ? (
        <WishContent 
    title={title}
    description={description}
        />
) : (
  <WishEditForm
     title={title}
    description={description}
    updating={ui.updating}
    deleting={ui.deleting}
    onTitleChange={setTitle}
    onDescriptionChange={setDescription}
    onSave={handleSave}
    onCancel={handleCancel}
  />
)}

<WishStatusSelect
    status={status}
    disabled={ui.updating || ui.deleting}
    onChange={handleStatusChange}
/>

      <WishActions 
       updating={ui.updating}
    deleting={ui.deleting}
    editing={ui.editing}
    onEdit={handleEdit}
    onDelete={handleDelete}
      />

      <button
  disabled={ui.updating || ui.deleting}
  onClick={handleShare}
>
  {isPublic
    ? "🙈 Remove from Feed"
    : "🌍 Share to Feed"}
</button>
{wish.inspiredBy && (
  <p className="text-sm italic text-gray-500">
    Inspired by @{wish.inspiredBy}
  </p>
)}

    </div>
  );
};

export default WishCard;