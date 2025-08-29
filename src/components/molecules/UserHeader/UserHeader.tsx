interface UserHeaderProps {
  name: string
  imageUrl: string
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, imageUrl }) => (
  <div
    className="flex items-center py-5 px-6 bg-white rounded gap-4 hidden md:flex"
    style={{ boxShadow: '0px 8px 20px 0px #E7EEFF80' }}
  >
    <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full" />
    <span className="text-secondary-grey font-semibold text-lg">{name}</span>
  </div>
)

export default UserHeader
