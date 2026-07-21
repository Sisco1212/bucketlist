
const WishActions = ({ updating, deleting, editing, onEdit, onDelete }: { updating: boolean; deleting: boolean; editing: boolean; onEdit: () => void; onDelete: () => void }) => {
  return (
    <div className="flex gap-2">
        <button
  disabled={updating || deleting || editing}
  onClick={onEdit}
>
  Edit
</button>

        <button
  disabled={updating || deleting}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
  onClick={onDelete}
>
  {deleting ? "Deleting..." : "Delete"}
</button>
      </div>
  )
}

export default WishActions