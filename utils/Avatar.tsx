import defaultUser from '../assets/default-user.png';

interface AvatarProps{
  picture?: string,
  name?: string,
  email?: string,
  className?: string,
  style?: React.CSSProperties
}
export const Avatar = ({ picture, name, email, className, style }:AvatarProps) => (
  <div className={className} style={style}>
    {picture ? (
      <img
        alt={name ?? email ?? "Avatar"}
        className="rounded-full object-cover w-7 h-7"
        src={picture}
        onError={(e) => {
          let img = e.target as HTMLImageElement;
          img.src = defaultUser;
        }}
      />
    ):(<div className="w-7 h-7 rounded-full bg-gray-300/50"/>)}
  </div>
)