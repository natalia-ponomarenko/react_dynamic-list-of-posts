import classNames from 'classnames';
import { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Error } from '../../types/Error';
import { DangerIcon } from '../DangerIcon';
import { LoadingError } from '../LoadingError';
import { addComment } from '../../api/posts';

type Props = {
  postId: number,
  onAdd: (comment: Comment) => void,
  // loading: boolean,
  // commentError: boolean,

};

export const NewCommentForm: React.FC<Props> = (
  {
    postId,
    onAdd,
    // loading,
    // commentError,
  },
) => {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(Error.NONE);
  const [emailError, setEmailError] = useState(Error.NONE);
  const [messageError, setMessageError] = useState(Error.NONE);
  const [commentError, setCommentError] = useState<boolean>(false);
  const [commentLoading, setCommentLoading]
  = useState<boolean>(false);

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();

    switch (name) {
      case 'name':
        setNameError(Error.NONE);
        setName(trimmedValue);
        break;

      case 'email':
        setEmailError(Error.NONE);
        setEmail(trimmedValue);

        break;

      case 'body':
        setMessageError(Error.NONE);
        setMessage(trimmedValue);

        break;
      default:
        break;
    }
  };

  const validateInputs = () => {
    if (!userName.length) {
      setNameError(Error.NAME);
    }

    if (!email) {
      setEmailError(Error.EMAIL);
    }

    if (!message) {
      setMessageError(Error.MESSAGE);
    }

    return userName && email && message;
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const clearErrors = () => {
    setNameError(Error.NONE);
    setEmailError(Error.NONE);
    setMessageError(Error.NONE);
  };

  const addNewComment = async () => {
    setCommentError(false);

    if (userName === '' || email === '' || message === '') {
      return;
    }

    const newComment = {
      postId,
      name: userName,
      email,
      body: message,
    };

    try {
      setCommentLoading(true);
      const addedComment = await addComment(newComment);

      setCommentLoading(false);
      onAdd(addedComment);
    } catch {
      setCommentError(true);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      addNewComment();
      setMessage('');
    }
  };

  const handleClear = () => {
    clearErrors();
    clearInputs();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              ' is-danger': nameError,
            })}
            value={userName}
            onChange={(event) => handleChange(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && (
            <DangerIcon />
          )}
        </div>
        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}

      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              ' is-danger': emailError !== '',
            })}
            value={email}
            onChange={(event) => handleChange(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailError && (
            <DangerIcon />
          )}
        </div>
        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('input', {
              ' is-danger': messageError !== '',
            })}
            value={message}
            onChange={(event) => handleChange(event)}
          />
        </div>
        {messageError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link', {
                'is-loading': commentLoading,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
          {commentError && (
            <LoadingError />
          )}
        </div>
      </div>
    </form>
  );
};
