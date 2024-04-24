import s from './styles.module.scss'

export function FancyAvatar({ image, ...props }) {
  return (
    <div className={s.wrapper} style={{ transform: 'scale(0.11)', position: 'absolute', ...props }}>
      <button className={s.buttonStyle}>
        <img src={image}/>
      </button>
    </div>
  );
}


