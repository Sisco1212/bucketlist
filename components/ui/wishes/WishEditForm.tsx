// import { useState } from "react";
// import { updateWish  } from "@/actions/wishes";

// const WishEditForm = () => {

//     const [title, setTitle] = useState(wish.title);

// const [description, setDescription] = useState(
//   wish.description ?? ""
// );

//   return (
//     <div className="space-y-2">
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
    
//       <textarea
//         value={description}
//         onChange={(e) =>
//           setDescription(e.target.value)
//         }
//       />
    
//       <div className="flex gap-2">
//         <button
//       type="button"
//       disabled={ui.updating || ui.deleting}
//       onClick={async () => {
//         setUi((prev) => ({
//           ...prev,
//           updating: true,
//         }));
    
//         try {
//           const result = await updateWish({
//             id: wish.id,
//             title,
//             description,
//           });
    
//           if (result.success) {
//             setUi((prev) => ({
//               ...prev,
//               editing: false,
//             }));
//           }
//         } finally {
//           setUi((prev) => ({
//             ...prev,
//             updating: false,
//           }));
//         }
//       }}
//     >
//       {ui.updating ? "Saving..." : "Save"}
//     </button>
    
//         <button
//           type="button"
//           onClick={() => {
//             setTitle(wish.title);
//             setDescription(
//               wish.description ?? ""
//             );
    
//             setUi((prev) => ({
//               ...prev,
//               editing: false,
//             }));
//           }}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   )
// }

// export default WishEditForm