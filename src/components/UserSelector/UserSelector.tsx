import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSelect: (user: User) => void,
  selectedUser?: User,
};

export const UserSelector: React.FC<Props> = (
  {
    users,
    onSelect,
    selectedUser,
  },
) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [selectedUser]);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <span>
            {
              selectedUser
                ? selectedUser.name
                : 'Choose a user'
            }
          </span>

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
        {isOpen
            && (
              <div className="dropdown-content">
                {users.map((user: User, i: number) => {
                  const { id, name } = user;

                  return (
                    <a
                      key={id}
                      href={`#user-${i + 1}`}
                      className={classNames(
                        'dropdown-item',
                        { 'is-active': selectedUser?.id === id },
                      )}
                      onClick={() => onSelect(user)}
                    >
                      {name}
                    </a>
                  );
                })}
              </div>
            )}
      </div>
    </div>
  );
};
