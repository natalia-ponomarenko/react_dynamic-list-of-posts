import classNames from 'classnames';
import { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Error } from '../../types/Error';
import { LoadingError } from '../LoadingError';
import { addComment } from '../../api/posts';
import { Input } from '../Input';

type Props = {
  postId: number,
  onAdd: (comment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = (
  {
    postId,
    onAdd,
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

    switch (name) {
      case 'name':
        setNameError(Error.NONE);
        setName(value);
        break;

      case 'email':
        setEmailError(Error.NONE);
        setEmail(value);

        break;

      case 'body':
        setMessageError(Error.NONE);
        setMessage(value);

        break;
      default:
        break;
    }
  };

  const validateInputs = () => {
    if (!userName.length) {
      setNameError(Error.NAME);
    }

    if (!email.length) {
      setEmailError(Error.EMAIL);
    }

    if (!message.length) {
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

    if (
      userName.trim() === ''
      || email.trim() === ''
      || message.trim() === ''
    ) {
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
      <Input
        cy_attr="NameField"
        id="comment-author-name"
        label="Author Name"
        name="name"
        value={userName}
        placeholder="Name Surname"
        error={nameError}
        onChange={handleChange}
      />
      <Input
        cy_attr="EmailField"
        id="comment-author-email"
        label="Author Email"
        name="email"
        value={email}
        placeholder="email@test.com"
        error={emailError}
        onChange={handleChange}
      />

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
