import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSelect: (user: User) => void;
  selectedUser?: User;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelect,
  selectedUser,
}) => {
  const [isOpen, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    onClose();
  }, [selectedUser]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"

      >
        <div className="dropdown-content" ref={ref}>
          {users.map((user: User) => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === id,
                })}
                onClick={() => (user.id === selectedUser?.id
                  ? onClose()
                  : onSelect(user))}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
