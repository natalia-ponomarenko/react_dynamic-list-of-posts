import classNames from 'classnames';
import { DangerIcon } from '../DangerIcon';

type Props = {
  cy_attr: string,
  id: string,
  label: string,
  name: string,
  value: string,
  placeholder: string,
  error: string,
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
  ) => void,
};

export const Input:React.FC<Props> = (
  {
    cy_attr,
    id,
    label,
    name,
    value,
    error,
    placeholder,
    onChange,
  },
) => {
  const capitalisedWord = name[0].toUpperCase() + name.slice(1);

  return (
    <div className="field" data-cy={cy_attr}>
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          className={classNames('input', {
            ' is-danger': error,
          })}
          value={value}
          onChange={onChange}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {error && (
          <DangerIcon />
        )}
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {`${capitalisedWord} is required`}
        </p>
      )}

    </div>
  );
};
