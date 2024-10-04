import defaultUser from '../assets/default-user.png';
import { classNames } from './shortclass';

interface AvatarProps{
  picture?: string,
  name?: string,
  email?: string,
  className?: string,
  style?: React.CSSProperties
  size?: 'sm' | 'md' | 'lg'
}
export const Avatar = ({ picture, name, email, className, style, size = 'md' }:AvatarProps) => (
  <div className={className} style={style}>
    {picture ? (
      <img
        alt={name ?? email ?? "Avatar"}
        className={classNames({
          'rounded-full object-cover': true,
          'w-6 h-6': size === 'sm',
          'w-7 h-7': size === 'md',
          'w-14 h-14': size === 'lg'
        })}
        src={picture}
        onError={(e) => {
          let img = e.target as HTMLImageElement;
          if(img.src !== defaultUser) img.src = defaultUser;
        }}
      />
    ):(
      <div className={classNames({
        'rounded-full bg-gray-300/50': true,
        'w-6 h-6': size === 'sm',
        'w-7 h-7': size === 'md',
        'w-14 h-14': size === 'lg'
      })}/>
    )}
  </div>
)