import { logout } from "@/actions/logout"

const LogoutButton = () => {
  return (
    <form action={logout}>
  <button type="submit" className="cursor-pointer bg-red-300 p-2 rounded-2xl text-white">Logout</button>
</form>
  )
}

export default LogoutButton