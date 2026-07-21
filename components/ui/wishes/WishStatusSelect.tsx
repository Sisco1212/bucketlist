import { WISH_STATUSES, type WishStatus } from "@/lib/constants/wish-status";

const WishStatusSelect = ({ status, disabled, onChange }: { status: WishStatus; disabled: boolean; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <select
      name="status"
      value={status}
      disabled={disabled}
      onChange={onChange}
    >
      {WISH_STATUSES.map((status) => (
        <option
          key={status.value}
          value={status.value}
        >
          {status.emoji} {status.label}
        </option>
      ))}
    </select>
  )
}

export default WishStatusSelect