
const WishEditForm = ({ title, description, updating, deleting, onTitleChange, onDescriptionChange, onSave, onCancel }: { title: string; description: string; updating: boolean; deleting: boolean; onTitleChange: (value: string) => void; onDescriptionChange: (value: string) => void; onSave: () => void; onCancel: () => void }) => {
  return (
   <div className="space-y-2">
     <input
       value={title}
       onChange={(e) => onTitleChange(e.target.value)}
     />
   
     <textarea
       value={description}
       onChange={(e) => onDescriptionChange(e.target.value)}
     />
   
     <div className="flex gap-2">
       <button
     type="button"
     disabled={updating || deleting}
     onClick={onSave}
   >
     {updating ? "Saving..." : "Save"}
   </button>
   
       <button
         type="button"
         onClick={onCancel}
       >
         Cancel
       </button>
     </div>
   </div>
  )
}

export default WishEditForm